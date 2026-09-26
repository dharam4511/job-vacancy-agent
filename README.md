# Job Vacancy Agent Netherlands with Claude

An AI-powered agent that searches for job vacancies in Dutch cities and extracts structured company and job information using Claude.

## Architecture

```
Frontend (React)
    ↓ HTTP
FastAPI Backend
    ↓
Claude Agent (LangChain)
    ↓
Job Data Sources (GitHub Jobs, DuckDuckGo, etc.)
```

## Setup

### 1. Get Claude API Key

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Create an API key in the "API Keys" section
4. Copy the key (format: `sk-ant-xxx...`)

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Then edit `.env` and add your Claude API key:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
CLAUDE_MODEL=claude-opus-5
```

## Running the Agent

### Option 1: CLI (Python Script)

```python
python
>>> from agent import chat
>>> chat("Find job openings in California")
```

### Option 2: API Server + Web Dashboard

**Terminal 1 - Start backend:**
```bash
python main.py
```

This starts a FastAPI server on `http://localhost:8000`

**Terminal 2 - Start frontend:**
```bash
cd frontend
npm install  # (if not already done)
npm start
```

This opens the React chat interface on `http://localhost:3000`

## Usage

### Example Queries

- "Show me jobs in Amsterdam"
- "Find software engineer positions in Rotterdam"
- "What job openings are available in Utrecht?"
- "List all vacancies in Eindhoven with company details"
- "Find jobs in Den Haag"
- "Search for data analyst roles in Groningen"

### Agent Workflow

1. **Search** - Searches job platforms for postings in the specified Dutch city
2. **Extract** - Uses Claude to extract structured data (company, title, salary in EUR, requirements, etc.)
3. **Enrich** - Optionally fetches additional company information from Netherlands market
4. **Present** - Returns organized results with all details in Dutch job market context

### Supported Dutch Cities

Amsterdam, Rotterdam, Utrecht, Eindhoven, Groningen, Tilburg, Almere, Breda, Arnhem, Haarlem, Alkmaar, Leeuwarden, Maastricht, Dordrecht, Leiden, Den Haag, Delft, Apeldoorn, Enschede, Nijmegen, and more.

## Files

| File | Purpose |
|---|---|
| `agent.py` | Claude agent with job search tools |
| `main.py` | FastAPI backend server |
| `frontend/src/App.jsx` | React chat interface |
| `frontend/src/App.css` | UI styling |
| `requirements.txt` | Python dependencies |
| `.env` | API keys (do not commit) |

## Cost

Using Claude Sonnet 5 (~$0.02-$0.10 per job search):
- Monthly cost for 1-5 users: ~$5-$20

## Deployment

### Deploy to Vercel

1. Backend (FastAPI):
```bash
# Create a Vercel account and install CLI
npm i -g vercel

# Deploy backend
vercel deploy
```

2. Frontend (React):
```bash
# Update API URL in App.jsx to your Vercel backend URL
# Then deploy
cd frontend
vercel deploy
```

### Deploy to Heroku

```bash
heroku create job-vacancy-agent
git push heroku main
heroku config:set ANTHROPIC_API_KEY=sk-ant-xxx
```

## Troubleshooting

**"Error: Could not find ANTHROPIC_API_KEY"**
- Make sure `.env` file exists and contains `ANTHROPIC_API_KEY=sk-ant-xxx`

**"No jobs found in [state]"**
- GitHub Jobs API may have limited listings
- Try different state names or common job titles

**"Connection refused at localhost:8000"**
- Make sure FastAPI server is running: `python main.py`

## Future Enhancements

- [ ] Support multiple job data sources (Indeed, LinkedIn, ZipRecruiter)
- [ ] Email digest reports
- [ ] Job alerts for new postings
- [ ] Resume matching
- [ ] Salary range filtering
- [ ] Saved jobs/favorites
- [ ] Database persistence (PostgreSQL/MongoDB)

## License

MIT
