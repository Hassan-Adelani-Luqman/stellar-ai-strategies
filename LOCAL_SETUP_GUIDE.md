# 🚀 Local Setup Guide - Stellar AI Strategies

## Prerequisites

Before running the application locally, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)
- **npm** or **pnpm** (comes with Node.js)

### Verify Installation
```bash
node --version    # Should show v18+ 
python --version  # Should show v3.9+
npm --version     # Should show npm version
git --version     # Should show git version
```

---

## 📂 Project Structure

```
stellar-ai-strategies/
├── backend/stellar-ai-backend/     # Flask API server
├── frontend/stellar-ai-frontend/   # React web application
├── docs/                          # Documentation
├── README.md                      # Project documentation
```

---

## ⚙️ Backend Setup (Flask API)

### 1. Navigate to Backend Directory
```bash
cd stellar-ai-strategies/backend/stellar-ai-backend
```

### 2. Create Python Virtual Environment (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Start the Flask Server
```bash
python src/main.py
```

**✅ Backend Success**: You should see:
```
* Running on http://127.0.0.1:5000
* Debug mode: on
```

**🌐 Backend URL**: http://localhost:5000

---

## 🎨 Frontend Setup (React App)

### 1. Open New Terminal Window
Keep the backend terminal running and open a new terminal.

### 2. Navigate to Frontend Directory
```bash
cd stellar-ai-strategies/frontend/stellar-ai-frontend
```

### 3. Install Node.js Dependencies
```bash
# Using npm
npm install

# OR using pnpm (faster)
pnpm install
```

### 4. Start the Development Server
```bash
# Using npm
npm run dev

# OR using pnpm
pnpm run dev
```

**✅ Frontend Success**: You should see:
```
VITE v6.3.5  ready in 1520 ms
➜  Local:   http://localhost:5174/
➜  press h + enter to show help
```

**🌐 Frontend URL**: http://localhost:5174

---

## 🎯 Quick Start Commands

### Option 1: Manual Setup
```bash
# Terminal 1 - Backend
cd stellar-ai-strategies/backend/stellar-ai-backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python src/main.py

# Terminal 2 - Frontend  
cd stellar-ai-strategies/frontend/stellar-ai-frontend
npm install
npm run dev
```

### Option 2: Quick Test (If Already Set Up)
```bash
# Terminal 1
cd backend/stellar-ai-backend && python src/main.py

# Terminal 2
cd frontend/stellar-ai-frontend && npm run dev
```

---

## 🔗 Application URLs

Once both servers are running:

- **🎨 Frontend Application**: http://localhost:5174
- **🔧 Backend API**: http://localhost:5000
- **📊 API Health Check**: http://localhost:5000/api/ai/health

---

## 🧪 Testing the Application

### 1. Access the Application
Open your browser and go to: http://localhost:5174

### 2. Collect Historical Data
- Click **"Collect Data Snapshot"** button
- Watch the console for real API responses
- Verify snapshot count increases

### 3. Train AI Model
- After collecting 5+ snapshots, click **"Train Model"**
- Wait for training completion message
- Verify model status shows "Trained"

### 4. Get AI Recommendations
- Click **"Get AI Strategy Recommendation"**
- Review AI-generated investment strategies
- Check for DeFindex vault suggestions

### 5. Analyze Portfolio
- Use the portfolio analysis features
- Review risk assessments and optimization suggestions

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError` when starting backend
```bash
# Solution: Ensure virtual environment is activated and dependencies installed
cd backend/stellar-ai-backend
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

**Problem**: Port 5000 already in use
```bash
# Solution: Kill the process or use different port
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -ti:5000 | xargs kill
```

**Problem**: API errors in console
```bash
# Solution: Check backend is running on http://localhost:5000
curl http://localhost:5000/api/ai/health
```

### Frontend Issues

**Problem**: `npm install` fails
```bash
# Solution: Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Port 5173/5174 already in use
```bash
# Solution: Vite will automatically try the next available port
# Check terminal output for the actual port number
```

**Problem**: API connection errors
```bash
# Solution: Verify backend is running and check API_BASE in code
# Frontend expects backend on http://localhost:5000
```

### Network Issues

**Problem**: CORS errors
```bash
# Solution: Backend has CORS enabled, restart both servers
```

**Problem**: Real API timeouts
```bash
# Solution: The app uses fallback data if real APIs are slow
# This is normal and expected behavior
```

---

## 🌐 API Endpoints

The backend provides these endpoints:

- `GET /api/ai/health` - Health check
- `POST /api/ai/collect-historical-data` - Collect market data
- `GET /api/ai/historical-data-status` - Check data status
- `POST /api/ai/train-model` - Train AI model
- `POST /api/ai/strategy-recommendation` - Get AI recommendations
- `POST /api/ai/portfolio-analysis` - Analyze portfolio

---

## 📱 Development Tips

### Hot Reload
- **Frontend**: Auto-reloads on file changes
- **Backend**: Auto-reloads with Flask debug mode

### Console Debugging
- **Frontend**: Open browser DevTools (F12) for console logs
- **Backend**: Check terminal output for API logs

### Data Persistence
- Historical data is stored in memory (resets on server restart)
- For persistent storage, the SQLite database is configured

---

## 🎬 Demo Preparation

### Before Recording Demo Video:
1. **Clean Setup**: Fresh terminal windows, clean desktop
2. **Test Run**: Complete one full workflow (collect → train → recommend)
3. **Browser Setup**: Open DevTools, clean browser cache
4. **Check URLs**: Verify both localhost:5000 and localhost:5174 work

### During Demo:
1. **Start Backend**: `python src/main.py`
2. **Start Frontend**: `npm run dev`
3. **Open Application**: http://localhost:5174
4. **Follow Demo Script**: Use DEMO_VIDEO_SCRIPT.md

---

## ✅ Success Checklist

- [ ] Python environment activated
- [ ] Backend dependencies installed
- [ ] Backend running on localhost:5000
- [ ] Frontend dependencies installed  
- [ ] Frontend running on localhost:5174
- [ ] Application loads in browser
- [ ] Data collection working
- [ ] AI training functional
- [ ] Strategy recommendations working

---

**🚀 You're ready to run Stellar AI Strategies locally!**

For questions or issues, check the troubleshooting section above or review the project documentation.
