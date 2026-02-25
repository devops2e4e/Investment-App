const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'finexa_secret_key_123';

app.use(cors());
app.use(express.json());

// Database Initialization
const dbPath = path.resolve(__dirname, 'finexa.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error opening database', err);
    else console.log('Connected to SQLite database');
});

// Create Tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        risk_tolerance TEXT DEFAULT 'moderate',
        balance REAL DEFAULT 1000000
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        type TEXT,
        asset_symbol TEXT,
        asset_name TEXT,
        amount REAL,
        units REAL,
        price REAL,
        date TEXT,
        status TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS holdings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        symbol TEXT,
        name TEXT,
        units REAL,
        avg_price REAL,
        UNIQUE(user_id, symbol),
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Missing token' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// --- AUTH ENDPOINTS ---

app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(query, [username, email, hashedPassword], function (err) {
        if (err) {
            return res.status(400).json({ error: 'User already exists or invalid data' });
        }
        res.json({ id: this.lastID, username, email });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], async (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
        res.json({
            token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                riskTolerance: user.risk_tolerance
            }
        });
    });
});

// --- SIMULATION ENDPOINTS ---

app.get('/api/simulation/state', authenticateToken, (req, res) => {
    const userId = req.user.id;

    const state = { balance: 0, holdings: [], transactions: [] };

    db.get('SELECT balance FROM users WHERE id = ?', [userId], (err, row) => {
        if (row) state.balance = row.balance;

        db.all('SELECT * FROM holdings WHERE user_id = ?', [userId], (err, holdings) => {
            state.holdings = holdings || [];

            db.all('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [userId], (err, txs) => {
                state.transactions = txs || [];
                res.json(state);
            });
        });
    });
});

app.post('/api/simulation/trade', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { asset, amount, type } = req.body;

    // Simple trade logic (same as frontend but on server)
    const units = amount / asset.price;
    const fee = amount * 0.015;
    const totalCost = amount + fee;

    db.get('SELECT balance FROM users WHERE id = ?', [userId], (err, userRow) => {
        if (!userRow) return res.status(404).json({ error: 'User not found' });

        if (type === 'Buy') {
            if (userRow.balance < totalCost) return res.status(400).json({ error: 'Insufficient funds' });

            db.serialize(() => {
                db.run('UPDATE users SET balance = balance - ? WHERE id = ?', [totalCost, userId]);

                db.get('SELECT * FROM holdings WHERE user_id = ? AND symbol = ?', [userId, asset.symbol], (err, holdRow) => {
                    if (holdRow) {
                        const newUnits = holdRow.units + units;
                        const newAvg = ((holdRow.units * holdRow.avg_price) + (units * asset.price)) / newUnits;
                        db.run('UPDATE holdings SET units = ?, avg_price = ? WHERE id = ?', [newUnits, newAvg, holdRow.id]);
                    } else {
                        db.run('INSERT INTO holdings (user_id, symbol, name, units, avg_price) VALUES (?, ?, ?, ?, ?)',
                            [userId, asset.symbol, asset.name, units, asset.price]);
                    }
                });

                const txId = Math.random().toString(36).substr(2, 9);
                db.run('INSERT INTO transactions (id, user_id, type, asset_symbol, asset_name, amount, units, price, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [txId, userId, 'Buy', asset.symbol, asset.name, totalCost, units, asset.price, new Date().toLocaleString(), 'Completed']);

                res.json({ success: true });
            });
        } else {
            // Sell logic
            db.get('SELECT * FROM holdings WHERE user_id = ? AND symbol = ?', [userId, asset.symbol], (err, holdRow) => {
                if (!holdRow || holdRow.units < units) return res.status(400).json({ error: 'Insufficient units' });

                db.serialize(() => {
                    db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [amount - fee, userId]);

                    const updatedUnits = holdRow.units - units;
                    if (updatedUnits < 0.0001) {
                        db.run('DELETE FROM holdings WHERE id = ?', [holdRow.id]);
                    } else {
                        db.run('UPDATE holdings SET units = ? WHERE id = ?', [updatedUnits, holdRow.id]);
                    }

                    const txId = Math.random().toString(36).substr(2, 9);
                    db.run('INSERT INTO transactions (id, user_id, type, asset_symbol, asset_name, amount, units, price, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [txId, userId, 'Sell', asset.symbol, asset.name, amount - fee, units, asset.price, new Date().toLocaleString(), 'Completed']);

                    res.json({ success: true });
                });
            });
        }
    });
});

app.post('/api/simulation/reset', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.serialize(() => {
        db.run('UPDATE users SET balance = 1000000 WHERE id = ?', [userId]);
        db.run('DELETE FROM holdings WHERE user_id = ?', [userId]);
        db.run('DELETE FROM transactions WHERE user_id = ?', [userId]);
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
