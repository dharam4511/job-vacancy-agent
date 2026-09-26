# 🚀 Deploy to Vercel & Railway in 5 Minutes

## Step 1: Push to GitHub (2 min)

```bash
git remote add origin https://github.com/YOUR_USERNAME/job-vacancy-agent.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Frontend to Vercel (2 min)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repo
4. Click "Deploy" (Vercel auto-detects React)
5. Copy your frontend URL: `https://job-vacancy-agent-[username].vercel.app`

## Step 3: Deploy Backend to Railway (3 min)

1. Go to https://railway.app
2. Click "Create New Project" → "Deploy from GitHub"
3. Select the same repo
4. Go to Variables (Railway auto-detects Python/FastAPI)
5. Add environment variables:
   - `AZURE_API_KEY` = your key from .env
   - `AZURE_API_ENDPOINT` = your endpoint
   - `AZURE_API_VERSION` = 2024-02-15-preview
   - `AZURE_DEPLOYMENT_NAME` = gpt-6-sol
6. Copy your backend URL: `https://job-vacancy-agent-backend-prod.railway.app`

## Step 4: Connect Frontend to Backend (1 min)

1. Go back to Vercel Project Settings
2. Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-railway-backend-url.railway.app`
4. Deploy by pushing to GitHub: `git commit --allow-empty -m "Trigger redeploy" && git push`

## ✅ Done!

- **Frontend Live**: `https://job-vacancy-agent-[username].vercel.app`
- **Backend Running**: `https://job-vacancy-agent-backend-prod.railway.app`
- **Select any city and category** → Results appear in <3 seconds!

## 📋 Cost

- **Vercel**: FREE (100 GB/month bandwidth)
- **Railway**: FREE ($5 credit/month)
- **Total**: $0/month

## ⚠️ Important Notes

1. **Cold starts**: First backend request takes 20-30 sec (free tier). Upgrade to paid for instant responses.
2. **Azure credentials**: Keep `.env` in `.gitignore` (already configured)
3. **CORS**: Already enabled in backend (main.py)
4. **Testing**: Once deployed, try: `https://your-vercel-url/` and select city + category

## 🔗 Your URLs (after deployment)

| Service | URL |
|---------|-----|
| Frontend | https://job-vacancy-agent-[your-username].vercel.app |
| Backend | https://job-vacancy-agent-backend-[your-id].railway.app |
| This Project | `/Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog` |

---

## Alternative: Deploy Backend to Render

If Railway has issues, use Render instead:

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (same as Railway)
6. Deploy

**Render URL**: `https://job-vacancy-agent-backend.onrender.com`

---

For detailed troubleshooting, see `DEPLOYMENT_GUIDE.md`
