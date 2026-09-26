# Job Vacancy Agent - Netherlands Edition

Your Job Vacancy Agent has been customized for the Dutch job market with city-based search instead of state-based.

## 🇳🇱 What's Changed

### Frontend Updates
- **CitySelector** - Select from 30+ major Dutch cities
- **City-focused UI** - All references changed from state to city
- **Dutch context** - Header now shows "Job Vacancy Agent Netherlands"

### Backend Updates
- **Dutch job search** - Agent searches for vacancies in Netherlands cities
- **Salary in EUR** - Jobs display salary in European currency
- **Dutch market knowledge** - Agent understands Dutch job market context
- **City names** - Recognizes all major Dutch cities (Amsterdam, Rotterdam, Utrecht, etc.)

### Supported Dutch Cities

**Major Cities:**
- Amsterdam, Rotterdam, Utrecht, Eindhoven, Groningen
- Tilburg, Almere, Breda, Arnhem, Haarlem

**Secondary Cities:**
- Alkmaar, Leeuwarden, Maastricht, Dordrecht, Leiden
- Den Haag, Delft, Apeldoorn, Enschede, Nijmegen
- Hengelo, Zaanstad, Hilversum, Zoetermeer, Hoorn
- Nieuwegein, Purmerend, Alphen aan den Rijn

## 🚀 Quick Start

```bash
# Terminal 1: Backend
cd /Users/dharamdeepsingh/Downloads/FDE_Training/Skill_For_KisanLog
python3 -m venv venv
source venv/bin/activate
cp .env.example .env
# Edit .env with your Claude API key
pip install -r requirements.txt
python main.py

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

Visit `http://localhost:3000`

## 💼 How to Use

1. **Select a Dutch city** from the dropdown (e.g., Amsterdam, Rotterdam, Utrecht)
2. **Click "Search Jobs"** - Agent searches for vacancies in that city
3. **View results** - Jobs appear as cards with:
   - Company name
   - Job title
   - City location
   - Salary (in EUR)
   - Required skills
   - Hiring contact
4. **Filter results** - Search by job title or company name
5. **Export to CSV** - Download results

## 📍 Example Searches

- "Find jobs in Amsterdam"
- "Show me software developer roles in Rotterdam"
- "What opportunities are available in Utrecht?"
- "List all vacancies in Eindhoven"
- "Search for data analyst positions in Groningen"

## 💰 Salary Information

- Jobs display salary in EUR (€)
- Format: "€XX.XXX - €YY.YYY per year" or specific amount
- Shows "Not specified" if salary not available

## 🔧 API Integration

The agent uses Claude to:
1. Search Dutch job portals and websites
2. Extract company details (name, location, website)
3. Parse job information (title, requirements, salary)
4. Identify hiring contacts (email, phone)
5. Format results in JSON

## 📱 Responsive Design

- **Desktop** - Full-width grid layout
- **Tablet** - Responsive grid (2 columns)
- **Mobile** - Single column, optimized for small screens

## 🔐 Data Privacy

- No personal data stored (session-only)
- API keys secured in `.env` (never committed)
- Uses public job sources only
- All processing via Claude API

## 📊 Sample Job Card

```
┌─────────────────────────────┐
│ Company: Tech Solutions NL  │
│ Role: Senior Python Dev     │
│ Location: Amsterdam         │
│ Salary: €60.000 - €80.000   │
│ Skills: Python, Django, AWS │
│ Contact: jobs@company.nl    │
│                             │
│ [Contact] [Apply Now]       │
└─────────────────────────────┘
```

## 🚀 Future Enhancements

- [ ] Filter by salary range
- [ ] Filter by job type (Full-time, Part-time, Contract)
- [ ] Email alerts for new jobs
- [ ] Save favorite jobs
- [ ] LinkedIn integration
- [ ] Multi-city search
- [ ] Industry filtering

## 🐛 Troubleshooting

**No jobs found in city?**
- Try another major city (Amsterdam, Rotterdam, Utrecht)
- Agent searches multiple job portals
- Some cities may have limited listings

**Backend won't start?**
- Ensure Python 3.8+ installed
- Check Claude API key is valid in `.env`
- Verify port 8000 is available

**Frontend styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart frontend server
- Check CSS files loaded correctly

## 📧 Support

For issues or questions:
1. Check SETUP_GUIDE.md for detailed setup
2. Review logs in terminal windows
3. Verify Claude API key is active
4. Restart both backend and frontend

## 📄 Files Overview

| File | Purpose |
|---|---|
| `agent.py` | Dutch job search agent |
| `main.py` | FastAPI backend server |
| `frontend/src/App.jsx` | React main app |
| `frontend/src/components/StateSelector.jsx` | City selector (30+ Dutch cities) |
| `frontend/src/components/JobsList.jsx` | Job grid display |
| `frontend/src/components/JobCard.jsx` | Individual job card |
| `frontend/src/App.css` | Styling |

## 💡 Tips

- **Major tech hubs**: Amsterdam, Rotterdam, Eindhoven, Utrecht
- **Finance hub**: Amsterdam, Den Haag
- **Manufacturing**: Eindhoven, Tilburg, Breda
- **Best job markets**: Amsterdam, Rotterdam, Utrecht (always have most listings)
- **Growing markets**: Groningen, Arnhem

## 🎯 Next Steps

1. Set up and run the application
2. Search your preferred Dutch city
3. Export results to CSV
4. Connect to real Dutch job APIs (LinkedIn, Workday, IndeedNL)
5. Customize for your needs

Enjoy finding jobs in the Netherlands! 🇳🇱
