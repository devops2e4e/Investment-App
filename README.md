# 💎 FINEXA – Investment Simulation Platform

**Finexa** is a premium, high-performance investment simulation platform designed to give users a high-end fintech experience. Built with visual clarity, fluid motion, and modern aesthetics, it provides a safe sandbox for educational portfolio management and market analysis.

![Finexa Banner](public/logo.png) <!-- Ensure you have a logo/banner in public if applicable, or remove this -->

## ✨ Features

- **🚀 Interactive Dashboard**: A central command center for tracking Net Worth, Portfolio Performance, and Recent Transactions with premium visual cues.
- **📊 Advanced Analytics**: Real-time visualization using high-performance charts for ROI projections and balance history.
- **🔍 Market Discovery**: A staggered, animated market grid featuring stocks, crypto, and ETFs with powerful filtering and sorting capabilities.
- **⚡ Proactive Simulation**: Safe trading environment with simulated buy/sell orders and instant portfolio impact analysis.
- **🎭 Motion & Aesthetics**: Powered by **Framer Motion** and **Lucide React**, providing a silky-smooth, premium user interface.
- **🔐 Secure & Anonymous**: Fully client-side simulation logic ensuring privacy and safety while you learn the ropes.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (JIT)
- **Animations**: Framer Motion
- **Iconography**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context & Hooks

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/finexa-app.git
   cd finexa-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

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

### 4. Manual Deployment (Host on any static server)
1. Run `npm run build`.
2. Upload the contents of the `dist` folder to your server.

---

> [!IMPORTANT]
> **Integration Note**: The codebase currently uses simulation logic (mock data) in `src/services/AssetService.ts`. To fully switch to your live backend, you will need to update the service methods to use `axios` or `fetch` with the `import.meta.env.VITE_API_URL`.

## 📐 Design Philosophy

Finexa follows a **Minimalist-Futuristic** design system:
- **Depth**: Soft shadows and subtle layering for a premium feel.
- **Clarity**: Bold typography and intentional whitespace to reduce cognitive load.
- **Feedback**: Micro-interactions and entrance animations to guide the user journey.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Crafted with precision for the next generation of investors.*
