# 💎 FINEXA - Investment Simulation Platform
## Documentation

**Version:** 1.0.0  
**Last Updated:** February 9, 2026  
**License:** MIT

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

**FINEXA** is a premium investment simulation platform providing a safe, educational environment for learning portfolio management and market analysis. Built with React, TypeScript, and modern web technologies.

### Key Objectives
- Safe sandbox for learning investment strategies
- Simulate real-world trading scenarios
- Track portfolio performance over time
- Educate users about market dynamics
- Premium, professional user experience

---

## Quick Start

### Prerequisites
- Node.js (v16.x or higher)
- npm or yarn

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Running the Application

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Runs on: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd server
node index.js
```
Runs on: `http://localhost:5000`

### First Steps
1. Open `http://localhost:5173` in your browser
2. Click "Sign Up" to create an account
3. Start trading with ₦1,000,000 virtual balance

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Session persistence

### Investment Simulation
- Virtual portfolio with ₦1,000,000 starting balance
- Buy/sell stocks, crypto, ETFs
- 1.5% transaction fee
- Holdings tracking with average price
- Complete transaction history
- Portfolio reset functionality

### Dashboard & Analytics
- Net worth and balance display
- Portfolio performance charts
- Asset allocation visualization
- Recent transactions list
- Profit/loss indicators

### Responsive Design
- Mobile-first approach
- Touch-optimized interface
- Adaptive navigation
- Works on all modern browsers

---

## Technology Stack

### Frontend
- **React** 19.2.0 - UI framework
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.2.4 - Build tool
- **Tailwind CSS** 4.1.18 - Styling
- **Framer Motion** 12.31.1 - Animations
- **Recharts** 3.7.0 - Charts
- **React Router** 7.13.0 - Routing
- **Axios** 1.13.4 - HTTP client

### Backend
- **Express** 5.2.1 - Web framework
- **SQLite3** 5.1.7 - Database
- **JWT** 9.0.3 - Authentication
- **bcryptjs** 3.0.3 - Password hashing
- **CORS** 2.8.6 - Cross-origin requests

---

## Project Structure

```
FINEXA INVESTMENT APP/
├── src/
│   ├── components/      # React components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── layout/      # Layout components
│   │   ├── market/      # Market components
│   │   └── ui/          # Reusable UI components
│   ├── context/         # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── MarketContext.tsx
│   │   └── SimulationContext.tsx
│   ├── pages/           # Page components
│   │   ├── auth/        # Login, Signup
│   │   └── dashboard/   # Dashboard pages
│   ├── services/        # API services
│   ├── App.tsx          # Main app & routing
│   └── main.tsx         # Entry point
├── server/
│   ├── index.js         # Express server
│   ├── finexa.db        # SQLite database
│   └── package.json
└── [config files]
```

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: { "id": 1, "username": "John Doe", "email": "john@example.com" }
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
}
```

### Simulation Endpoints (Protected)

All require: `Authorization: Bearer <token>`

#### Get State
```http
GET /simulation/state

Response: {
  "balance": 950000,
  "holdings": [{ "symbol": "AAPL", "name": "Apple Inc.", "units": 10, "avg_price": 150.50 }],
  "transactions": [...]
}
```

#### Execute Trade
```http
POST /simulation/trade
Content-Type: application/json

{
  "asset": { "symbol": "AAPL", "name": "Apple Inc.", "price": 150.50 },
  "amount": 1500,
  "type": "Buy"
}

Response: { "success": true }
Error: { "error": "Insufficient funds" }
```

#### Reset Simulation
```http
POST /simulation/reset

Response: { "success": true }
```

---

## Database Schema

### users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,              -- bcrypt hashed
    risk_tolerance TEXT DEFAULT 'moderate',
    balance REAL DEFAULT 1000000
);
```

### transactions
```sql
CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    user_id INTEGER,
    type TEXT,                  -- 'Buy' or 'Sell'
    asset_symbol TEXT,
    asset_name TEXT,
    amount REAL,
    units REAL,
    price REAL,
    date TEXT,
    status TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

### holdings
```sql
CREATE TABLE holdings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    symbol TEXT,
    name TEXT,
    units REAL,
    avg_price REAL,
    UNIQUE(user_id, symbol),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

---

## Troubleshooting

### Backend Connection Refused
**Error:** `ERR_CONNECTION_REFUSED`

**Solution:**
```bash
cd server
node index.js
```

### Session Not Persisting
- Check browser localStorage for `finexa_token` and `finexa_user`
- Verify both servers are running
- Check browser console for errors

### Database Locked
```bash
cd server
rm finexa.db
node index.js  # Recreates database
```

### Build Errors
```bash
npm run build
# Check TypeScript errors and fix imports
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

cd server
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Reference

### Common Commands
```bash
npm run dev          # Start frontend
npm run build        # Build for production
npm run preview      # Preview build
cd server && node index.js  # Start backend
```

### Key Files
- `src/App.tsx` - Main app & routing
- `src/context/AuthContext.tsx` - Auth state
- `src/context/SimulationContext.tsx` - Trading state
- `src/services/api.ts` - API config
- `server/index.js` - Backend server

### State Management
- **Auth**: `useAuth()` hook - user authentication
- **Simulation**: `useSimulation()` hook - trading state
- **Market**: `useMarket()` hook - market data

---

**Crafted with precision for the next generation of investors.** 💎📈

*Last Updated: February 9, 2026 | Version 1.0.0*
