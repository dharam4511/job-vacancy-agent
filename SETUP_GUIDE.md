# Job Vacancy Agent Netherlands - Complete Setup Guide

Follow this guide to get the Job Vacancy Agent for Netherlands running on your machine with both backend and frontend.

## 📋 Prerequisites

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 14+** - [Download](https://nodejs.org/)
- **Claude API Key** - [Get from console.anthropic.com](https://console.anthropic.com)
- **2 Terminal windows** (or tabs)

## 🔧 Step 1: Get Claude API Key

1. Go to https://console.anthropic.com
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy the key (format: `sk-ant-xxx...`)
6. Keep it safe - you'll need it in Step 2

## 🚀 Step 2: Set Up Backend

### 2.1 Create Python Virtual Environment

```bash
cd /Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# On Windows, use:
# venv\Scripts\activate
```

### 2.2 Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2.3 Set Up Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Claude API key
# Open .env in your text editor and replace:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Mac/Linux:**
```bash
nano .env
# Paste: ANTHROPIC_API_KEY=sk-ant-xxx
# Press Ctrl+O, Enter, Ctrl+X to save
```

**Windows (Notepad):**
```bash
notepad .env
# Edit and save
```

### 2.4 Start Backend Server

```bash
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

✅ **Backend is ready!** Keep this terminal running.

## 🎨 Step 3: Set Up Frontend

### 3.1 Open New Terminal Window

Open a **new terminal** (keep backend running in first one)

### 3.2 Install Dependencies

```bash
cd /Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog/frontend

npm install
```

This installs React and all required packages.

### 3.3 Start Frontend Server

```bash
npm start
```

You should see:
```
Compiled successfully!
You can now view the app in the browser.
Local: http://localhost:3000
```

A browser window will automatically open at `http://localhost:3000`

✅ **Frontend is ready!**

## 💼 Step 4: Use the Application

### In Your Browser (http://localhost:3000):

1. **Select a State** - Click dropdown and choose a US state
   - Example: California, Texas, New York, etc.

2. **Click "Search Jobs"** - The agent starts searching

3. **View Results** - Jobs appear as cards showing:
   - Company name
   - Job title
   - Location
   - Salary (if available)
   - Required skills
   - Hiring contact
   - Apply button

4. **Filter Results** - Use the search box to filter by:
   - Job title
   - Company name
   - Skills/requirements

5. **Export to CSV** - Click "Export CSV" button to download results

## 📊 Example Queries

Try these Dutch cities to test:
- **Amsterdam** - Tech hub with many listings
- **Rotterdam** - Large job market with shipping/logistics
- **Utrecht** - Major tech and finance center
- **Eindhoven** - Tech and engineering roles
- **Den Haag** - Government and corporate jobs
- **Groningen** - Growing tech scene

## 🐛 Troubleshooting

### Backend won't start
```
Error: Could not find ANTHROPIC_API_KEY
```
**Solution:** Make sure `.env` file exists with your API key

### Frontend won't connect to backend
```
Error: Could not reach the server
```
**Solution:**
1. Check backend is running (`python main.py`)
2. Verify it's on `http://localhost:8000`
3. Check `.env` in frontend folder has correct API URL

### No jobs found in search
**Solution:**
- GitHub Jobs API may have limited listings
- Try another state
- Check terminal for error messages

### Port already in use
```
Address already in use
```
**Solution:**
```bash
# Kill process on port 3000 (frontend)
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9
```

## 📁 Project Structure

```
Skill_For_KisanLog/
├── agent.py              # Claude agent with job tools
├── main.py               # FastAPI backend server
├── requirements.txt      # Python dependencies
├── .env                  # API keys (don't commit!)
├── .env.example         # Example environment file
├── README.md            # Project documentation
├── SETUP_GUIDE.md       # This file
└── frontend/            # React application
    ├── package.json     # Node dependencies
    ├── .env            # Frontend config
    ├── public/
    │   └── index.html  # HTML entry point
    └── src/
        ├── App.jsx     # Main app
        ├── App.css     # Styles
        ├── index.js    # Entry point
        └── components/
            ├── StateSelector.jsx
            ├── JobsList.jsx
            └── JobCard.jsx
```

## 💰 Cost Estimation

Using Claude Sonnet 5 (recommended for cost efficiency):

| Queries/Month | Cost |
|---|---|
| 10 | ~$0.20 |
| 50 | ~$1.00 |
| 100 | ~$2.00 |
| 500 | ~$10.00 |

## 🚀 Deploy to Production

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Log in
heroku login

# Create app
heroku create job-vacancy-agent

# Set environment variable
heroku config:set ANTHROPIC_API_KEY=sk-ant-xxx

# Deploy
git push heroku main
```

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Update API URL in frontend/.env
# REACT_APP_API_URL=https://your-backend-url.herokuapp.com

# Deploy
cd frontend
vercel
```

## ✅ Verification Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 14+ installed
- [ ] Claude API key obtained
- [ ] Virtual environment created and activated
- [ ] Python dependencies installed
- [ ] .env file created with API key
- [ ] Backend running on port 8000
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 3000
- [ ] Browser shows UI at localhost:3000
- [ ] Can select state and search jobs
- [ ] Jobs display correctly

## 📞 Support

If you encounter issues:

1. **Check browser console** - F12 → Console tab for errors
2. **Check terminal output** - Look for error messages
3. **Verify API key** - Make sure it's correct and active
4. **Restart servers** - Kill and restart both services

## 🎉 You're All Set!

Your Job Vacancy Agent is now running! 

**Next steps:**
- Search for jobs in your preferred state
- Export results to CSV
- Share with friends
- Customize job sources and features

Happy job hunting! 🚀
