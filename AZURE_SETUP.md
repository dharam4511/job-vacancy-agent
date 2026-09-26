# Job Vacancy Agent - Azure OpenAI Setup

Your project has been updated to use **Azure OpenAI (GPT)** instead of Claude.

## ✅ What Changed

### Backend Files Updated
- ✅ `agent.py` - Now uses `AzureChatOpenAI` from langchain-openai
- ✅ `requirements.txt` - Replaced `langchain-anthropic` with `langchain-openai` and `openai`
- ✅ `.env` - Updated with Azure configuration

### Libraries Installed
- ✅ `langchain-openai` - Azure OpenAI integration
- ✅ `openai` - Azure OpenAI SDK
- ✅ `tiktoken` - Token counting for GPT models
- ✅ All other dependencies unchanged

---

## 📋 .env Configuration

Your `.env` file now contains:

```env
AZURE_API_KEY=your-azure-api-key-here
AZURE_API_ENDPOINT=https://fde-cohort1.cognitiveservices.azure.com/
AZURE_API_VERSION=2024-02-15-preview
AZURE_DEPLOYMENT_NAME=gpt-6-sol
```

**Verify these values match your Azure configuration!**

---

## ⚠️ SECURITY WARNING

**Your Azure API key was posted publicly in chat.**

You should:
1. ✅ Go to Azure Portal immediately
2. ✅ **Regenerate the API key** (these credentials are compromised)
3. ✅ Update `.env` with the new key
4. ✅ Never post API keys in chat or public places

---

## 🚀 Running the Application

### Terminal 1: Backend Server

```bash
cd /Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog
source venv/bin/activate
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Terminal 2: Frontend Server

```bash
cd /Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog/frontend
npm start
```

Open browser: **http://localhost:3000**

---

## 🔧 How It Works

```
User Input (City selection)
    ↓
Frontend (React) at :3000
    ↓
Backend API (FastAPI) at :8000
    ↓
Agent (LangChain + Azure OpenAI)
    ├─ search_jobs_in_city()
    ├─ extract_job_details()
    ├─ enrich_company_info()
    └─ get_dutch_cities()
    ↓
Azure OpenAI (GPT) processes results
    ↓
Response back to Frontend
    ↓
Display in browser
```

---

## 📝 Key Differences from Claude

| Aspect | Claude | Azure OpenAI (GPT) |
|---|---|---|
| **Model** | Claude Opus 5 | GPT (gpt-6-sol) |
| **Provider** | Anthropic | Microsoft Azure |
| **Library** | langchain-anthropic | langchain-openai |
| **API Format** | Different | OpenAI-compatible |
| **Token Count** | Different tokenizer | tiktoken (GPT tokenizer) |
| **Pricing** | Per token | Per token (Azure rates) |

---

## ✅ Testing the Setup

1. **Start both servers** (Terminal 1 + Terminal 2)
2. **Open http://localhost:3000**
3. **Select "Amsterdam"** from city dropdown
4. **Click "Search Jobs"**
5. **See results appear** with company details

If you see jobs displayed, **it's working!** ✅

---

## 🐛 Troubleshooting

### "Invalid Azure API key"
- Check `.env` file has correct AZURE_API_KEY
- Regenerate key in Azure Portal if expired
- Restart backend server

### "Connection refused at localhost:8000"
- Make sure Terminal 1 is still running
- Check for error messages in Terminal 1
- Verify port 8000 is not in use

### "Cannot import AzureChatOpenAI"
```bash
# Reinstall Azure packages
cd /Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog
source venv/bin/activate
pip install langchain-openai openai
```

### "Azure API quota exceeded"
- Check Azure Portal for API usage limits
- May need to upgrade subscription
- Contact Azure support if limit reached

---

## 📚 Related Files

- `agent.py` - Job search agent with Azure OpenAI
- `main.py` - FastAPI backend server
- `frontend/src/App.jsx` - React frontend
- `requirements.txt` - Python dependencies
- `.env` - Configuration (Azure credentials)

---

## 🎯 Next Steps

1. ✅ Regenerate Azure API key (security)
2. ✅ Update `.env` with new key
3. ✅ Start both servers
4. ✅ Test with a Dutch city
5. ✅ Deploy to production when ready

---

## 📞 Support

For Azure OpenAI issues:
- Azure Documentation: https://learn.microsoft.com/en-us/azure/cognitive-services/openai/
- Azure Portal: https://portal.azure.com
- LangChain Azure OpenAI: https://python.langchain.com/docs/integrations/llms/azure_openai

---

**Setup Status: ✅ Ready to use Azure OpenAI!**
