# Deployment Guide: Job Vacancy Agent

This guide covers deploying the full-stack application to production.

## Architecture

- **Frontend**: React app → Deployed to **Vercel**
- **Backend**: FastAPI server → Deployed to **Railway** or **Render**

---

## Part 1: Deploy Frontend to Vercel

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub account (recommended, but not required)

### Steps

#### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/job-vacancy-agent.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure project settings:
     - Framework: Create React App
     - Root Directory: `./`
     - Build Command: `cd frontend && npm install && npm run build`
     - Output Directory: `frontend/build`

3. **Add Environment Variables**
   - In Vercel Project Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.railway.app`

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically deploys on git push

#### Option B: Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
cd /Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog
vercel --prod

# When prompted:
# - Link to existing project? → No (first time)
# - Project name? → job-vacancy-agent
# - Directory? → ./
# - Build command? → cd frontend && npm install && npm run build
# - Output directory? → frontend/build
```

**Frontend URL**: `https://job-vacancy-agent-[your-handle].vercel.app`

---

## Part 2: Deploy Backend to Railway

Railway offers free tier with $5/month credit (usually enough for this app).

### Prerequisites
- Railway account (free at railway.app)
- GitHub account (recommended)

### Steps

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "Create New Project"
   - Select "Deploy from GitHub"
   - Find and select `job-vacancy-agent` repository
   - Railway auto-detects Python/FastAPI

3. **Configure Environment Variables**
   - Railway dashboard → Variables
   - Add these from your `.env`:
     ```
     AZURE_API_KEY=your-key-here
     AZURE_API_ENDPOINT=https://fde-cohort1.cognitiveservices.azure.com/
     AZURE_API_VERSION=2024-02-15-preview
     AZURE_DEPLOYMENT_NAME=gpt-6-sol
     ```

4. **Configure Start Command**
   - Go to Settings → Deploy
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Port: `8000` (Railway assigns automatically)

5. **Deploy**
   - Railway automatically deploys
   - Get your backend URL from the Railway dashboard
   - Example: `https://job-vacancy-agent-backend-prod.railway.app`

---

## Part 3: Connect Frontend to Backend

### Update Vercel Environment

1. **Go to Vercel Project Settings**
2. **Environment Variables**
3. **Add/Update**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-railway-backend-url.railway.app`
4. **Redeploy**: Push to GitHub or run `vercel --prod`

---

## Part 4: Test Deployment

```bash
# Frontend is live at:
https://job-vacancy-agent-[your-handle].vercel.app

# Test by selecting city and job category
# Results should appear within 2-3 seconds
```

---

## Alternative: Deploy Backend to Render

If you prefer Render over Railway:

1. **Go to https://render.com**
2. **New → Web Service**
3. **Connect GitHub repository**
4. **Configure**:
   - Name: `job-vacancy-agent-backend`
   - Environment: Python 3.9
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Add Environment Variables** (from .env)
6. **Deploy**

**Render URL**: `https://job-vacancy-agent-backend.onrender.com`

---

## Troubleshooting

### Frontend shows empty results
- Check `REACT_APP_API_URL` is set correctly in Vercel
- Backend URL should end without trailing slash
- Verify CORS is enabled on backend (already configured in main.py)

### Backend returns 403/401
- Verify Azure credentials are correct in Railway/Render
- Check credentials haven't expired
- Test locally first: `python -c "from agent import chat; print(chat('Find all IT Engineer jobs in Amsterdam, Netherlands'))"`

### Cold start delays
- First request to Railway/Render takes 20-30 seconds (free tier)
- Subsequent requests are instant
- Consider upgrading to paid tier for instant responses

---

## Monitoring

### Vercel
- Dashboard shows deployment status and analytics
- Real-time logs available

### Railway/Render  
- Dashboard shows CPU/Memory usage
- Logs available in console
- Alerts can be configured

---

## Cost Estimate

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Hobby | $0/month (includes 100 GB bandwidth) |
| Railway | Free + usage | $0-5/month |
| **Total** | | **$0-5/month** |

---

## Next Steps

1. Deploy frontend to Vercel
2. Deploy backend to Railway/Render
3. Connect them via environment variables
4. Test in production
5. Share the Vercel URL!

For questions, refer to:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
