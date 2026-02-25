const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'finexa_secret_key_123';
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Database Connection
if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.error('CRITICAL: MongoDB connection error:', err.message);
            console.error('URI used:', MONGODB_URI.replace(/:([^@]+)@/, ':****@')); // Hide password
        });
} else {
    console.error('CRITICAL: MONGODB_URI is not defined in environment variables.');
}

// --- HEALTH CHECK ---
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date()
    });
});

// --- SCHEMAS & MODELS ---

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    riskTolerance: { type: String, default: 'moderate' },
    balance: { type: Number, default: 1000000 }
});

const User = mongoose.model('User', userSchema);

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    assetSymbol: { type: String, required: true },
    assetName: { type: String, required: true },
    amount: { type: Number, required: true },
    units: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Completed' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const holdingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    units: { type: Number, required: true },
    avgPrice: { type: Number, required: true }
});

holdingSchema.index({ userId: 1, symbol: 1 }, { unique: true });
const Holding = mongoose.model('Holding', holdingSchema);

// --- AUTHENTICATION MIDDLEWARE ---

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Missing token' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

// --- AUTH ENDPOINTS ---

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        
        console.log(`User registered: ${email}`);
        res.json({ id: user._id, username, email });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(400).json({ error: 'Registration failed: ' + err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                riskTolerance: user.riskTolerance
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// --- SIMULATION ENDPOINTS ---

app.get('/api/simulation/state', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const holdings = await Holding.find({ userId });
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });

        res.json({
            balance: user.balance,
            holdings: holdings.map(h => ({
                id: h._id,
                symbol: h.symbol,
                name: h.name,
                units: h.units,
                avg_price: h.avgPrice
            })),
            transactions: transactions.map(t => ({
                id: t._id,
                type: t.type,
                asset_symbol: t.assetSymbol,
                asset_name: t.assetName,
                amount: t.amount,
                units: t.units,
                price: t.price,
                date: t.date.toLocaleString(),
                status: t.status
            }))
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/simulation/trade', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { asset, amount, type } = req.body;

        const units = amount / asset.price;
        const fee = amount * 0.015;
        const totalCost = amount + fee;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (type === 'Buy') {
            if (user.balance < totalCost) return res.status(400).json({ error: 'Insufficient funds' });

            // Update balance
            user.balance -= totalCost;
            await user.save();

            // Update holding
            let holding = await Holding.findOne({ userId, symbol: asset.symbol });
            if (holding) {
                const totalUnits = holding.units + units;
                holding.avgPrice = ((holding.units * holding.avgPrice) + (units * asset.price)) / totalUnits;
                holding.units = totalUnits;
                await holding.save();
            } else {
                holding = new Holding({
                    userId,
                    symbol: asset.symbol,
                    name: asset.name,
                    units,
                    avgPrice: asset.price
                });
                await holding.save();
            }

            // Create transaction
            const tx = new Transaction({
                userId,
                type: 'Buy',
                assetSymbol: asset.symbol,
                assetName: asset.name,
                amount: totalCost,
                units,
                price: asset.price
            });
            await tx.save();

        } else {
            // Sell logic
            const holding = await Holding.findOne({ userId, symbol: asset.symbol });
            if (!holding || holding.units < units) return res.status(400).json({ error: 'Insufficient units' });

            user.balance += (amount - fee);
            await user.save();

            holding.units -= units;
            if (holding.units < 0.0001) {
                await Holding.deleteOne({ _id: holding._id });
            } else {
                await holding.save();
            }

            const tx = new Transaction({
                userId,
                type: 'Sell',
                assetSymbol: asset.symbol,
                assetName: asset.name,
                amount: amount - fee,
                units,
                price: asset.price
            });
            await tx.save();
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

app.post('/api/simulation/reset', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        await User.findByIdAndUpdate(userId, { balance: 1000000 });
        await Holding.deleteMany({ userId });
        await Transaction.deleteMany({ userId });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
