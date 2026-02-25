# 💎 FINEXA – Investment Simulation Platform

**Finexa** is a premium, high-performance investment simulation platform designed to give users a high-end fintech experience. Built with visual clarity, fluid motion, and modern aesthetics, it provides a safe sandbox for educational portfolio management and market analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.18-38bdf8.svg)

---

## ✨ Features

- 🚀 **Interactive Dashboard** - Track Net Worth, Portfolio Performance, and Recent Transactions
- 📊 **Advanced Analytics** - Real-time visualization using high-performance charts
- 🔍 **Market Discovery** - Animated market grid featuring stocks, crypto, and ETFs
- ⚡ **Proactive Simulation** - Safe trading environment with instant portfolio impact analysis
- 🎭 **Premium UI/UX** - Powered by Framer Motion and Lucide React
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔐 **Secure Authentication** - JWT-based auth with session persistence

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** + **TypeScript 5.9**
- **Vite 7.2** - Lightning-fast build tool
- **Tailwind CSS 4.1** - Utility-first styling
- **Framer Motion 12** - Smooth animations
- **Recharts 3.7** - Data visualization
- **React Router 7.13** - Client-side routing

### Backend
- **Node.js** + **Express 5.2**
- **SQLite3 5.1** - Lightweight database
- **JWT 9.0** - Authentication
- **bcryptjs 3.0** - Password hashing

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.x or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Run the application**

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

3. **Open your browser**
   Navigate to `http://localhost:5173` and start trading!

---

## 📚 Documentation

For comprehensive documentation including:
- Complete API reference
- Component documentation
- Architecture overview
- Deployment guides
- Troubleshooting

**See [DOCUMENTATION.md](./DOCUMENTATION.md)**

---

## 📁 Project Structure

```
FINEXA INVESTMENT APP/
├── src/
│   ├── components/      # React components
│   ├── context/         # State management
│   ├── pages/           # Page components
│   ├── services/        # API services
│   └── App.tsx          # Main app
├── server/
│   ├── index.js         # Express server
│   └── finexa.db        # SQLite database
└── DOCUMENTATION.md     # Full documentation
```

---

## 🎯 Key Features Explained

### Virtual Trading
Start with **₦1,000,000** virtual balance and practice trading without risk.

### Real-time Market Data
Live price updates and market analytics for informed decision-making.

### Portfolio Management
Track holdings, calculate profits/losses, and view transaction history.

### Responsive Design
Seamless experience across all devices with mobile-first approach.

---

## 🔒 Security

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Parameterized SQL queries
- ✅ CORS configuration
- ✅ Session management

---

## 📱 Mobile Features

- **Scroll Lock** - Body scroll disabled when mobile menu open
- **Touch-Optimized** - Large tap targets and smooth gestures
- **Adaptive Navigation** - Different layouts for mobile/desktop
- **Dashboard Access** - Full dashboard navigation on mobile

---

## 🎨 Design Philosophy

Finexa follows a **Minimalist-Futuristic** design system:
- **Depth**: Soft shadows and subtle layering for a premium feel
- **Clarity**: Bold typography and intentional whitespace
- **Feedback**: Micro-interactions and entrance animations
- **Consistency**: Unified color palette and spacing system

---

## 🚀 Deployment

Since you already have your backend link, follow these steps to deploy the FINEXA frontend:

### 1. Configure Environment Variables
Create a `.env` file in the root directory (use `.env.example` as a template) and add your backend link:
```bash
VITE_API_URL=https://your-deployed-backend-link.com
```

### 2. Deploy to Vercel (Recommended)
Vercel is the easiest platform for Vite/React applications:
1. **Push your code** to a GitHub/GitLab/Bitbucket repository.
2. **Import the project** into Vercel.
3. **Environment Variables**: During the "Configure Project" step, add a variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `[Your Backend Link]`
4. **Deploy**: Click deploy. Vercel will automatically detect Vite and run `npm run build`.

### 3. Deploy to Netlify
1. **Connect your Repo** to Netlify.
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**: Go to Site settings > Environment variables and add `VITE_API_URL`.

---

> [!IMPORTANT]
> **Integration Note**: The frontend uses `VITE_API_URL` to connect to the backend. Ensure your backend is deployed and accessible via this URL.

### Backend Deployment
If you need to deploy the included backend:
1. Navigate to the `server/` directory.
2. Deploy to a platform that supports Node.js (Heroku, Render, etc.).
3. Update the frontend's `VITE_API_URL` with the backend's live URL.

---

## 🐛 Troubleshooting

### Backend Connection Error
```bash
# Ensure backend is running
cd server
node index.js
```

### Session Not Persisting
- Check browser localStorage for `finexa_token`
- Verify AuthContext session restoration

For more issues, see [Troubleshooting Guide](./DOCUMENTATION.md#troubleshooting)

---

## 📊 Database Schema

- **users** - User accounts and balances
- **transactions** - Trading history
- **holdings** - Current portfolio positions

Full schema details in [DOCUMENTATION.md](./DOCUMENTATION.md#database-schema)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by leading fintech platforms
- Designed for educational purposes

---

## 📞 Support

- 📖 [Full Documentation](./DOCUMENTATION.md)
- 🐛 [Report Issues](https://github.com/yourusername/finexa/issues)
- 💬 [Discussions](https://github.com/yourusername/finexa/discussions)

---

## 🎯 Roadmap

- [ ] Real-time WebSocket price updates
- [ ] Advanced charting with TradingView
- [ ] Portfolio analytics and insights
- [ ] Social trading features
- [ ] Mobile app (React Native)
- [ ] Multi-currency support
- [ ] AI-powered investment suggestions

---

**Crafted with precision for the next generation of investors.** 💎📈

*Last Updated: February 9, 2026*
