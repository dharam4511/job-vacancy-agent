# Job Vacancy Agent - Requirements Document

**Project:** Automated job vacancy finder and aggregator  
**Date:** 2026-09-26  
**Users:** 1–5 personal users  
**Status:** Requirements phase

---

## Overview

Build an AI agent that discovers and aggregates job vacancies posted in a user-selected state, extracts company and job details, and presents findings via a web dashboard or scheduled report.

---

## Functional Requirements

### 1. Area Selection
- User can select a **US state** (dropdown or search)
- Agent searches for vacancies in that state
- No industry or job type filtering (all jobs eligible)

### 2. Data Collection
- Agent finds job vacancies from any available source (web scraping, APIs, job boards)
- No specific data source required; flexibility to use LinkedIn, Indeed, AngelList, GitHub Jobs, or others
- Frequency: On-demand (triggered by user) OR scheduled (daily/weekly)

### 3. Information Extraction
For each vacancy, extract and display:
- **Company name**
- **Company location** (city, state)
- **Company website**
- **Job title**
- **Salary** (if available)
- **Job requirements** (skills, experience)
- **Hiring contact** (name, email, phone if available)

### 4. Output Format
- **Option A:** Web dashboard (recommended for 1–5 users)
  - Display vacancies in a searchable table or card layout
  - Filter by company, job title, salary range
  - Real-time refresh or manual refresh button
- **Option B:** Scheduled report
  - Daily or weekly email digest of new vacancies
  - Exportable as PDF or CSV

### 5. AI Agent Behavior
- Use Claude (via Claude API) to:
  - Parse job postings and extract structured data
  - Enrich company info (fill gaps, verify data)
  - Validate email/contact info
  - Summarize job requirements in plain language

---

## Non-Functional Requirements

### Performance
- Page load: <2 seconds
- Job search processing: <5 minutes per state
- Dashboard supports 5 concurrent users

### Reliability
- Graceful error handling (missing data, API outages)
- No data loss if Claude API call fails
- Retry logic for transient failures

### Security & Privacy
- API keys (Claude, job board APIs) stored securely in environment variables
- HTTPS only
- No user authentication required (personal use; trusted users)
- No personal data storage beyond session state

### Cost
- Claude API usage optimized (batch operations if >100 jobs)
- Vercel serverless (free tier acceptable for personal use)
- Job data sources: free or low-cost APIs preferred

---

## Tech Stack (Proposed)

| Layer | Technology |
|---|---|
| **Frontend** | Next.js (React) + TailwindCSS |
| **Backend** | Next.js API routes (serverless on Vercel) |
| **LLM** | Claude API (Sonnet 5 for cost, or Opus 5 for accuracy) |
| **Data source** | Web scraping (Cheerio) + public APIs (Indeed, LinkedIn) |
| **Storage** | JSON file or lightweight DB (optional; Vercel KV for caching) |
| **Deployment** | Vercel |
| **Scheduling** | Vercel Cron functions (for scheduled reports) |

---

## User Workflow

1. User selects a state from dropdown
2. User clicks "Search for vacancies"
3. Agent queries job sources and extracts data (Claude processes results)
4. Dashboard displays 20–50 job listings with extracted details
5. User can filter, search, export, or trigger another search

---

## Success Criteria

- ✅ Agent successfully extracts ≥80% of required fields per vacancy
- ✅ Dashboard loads and displays results within 5 seconds
- ✅ Handles 50+ vacancies per search without errors
- ✅ Deploys to Vercel with no build errors
- ✅ Cost per search <$0.10 (Claude API usage)

---

## Out of Scope

- User authentication / multiple user accounts
- Database persistence (unless required for performance)
- Mobile app (web dashboard only)
- Job alerts/notifications
- Resume matching
