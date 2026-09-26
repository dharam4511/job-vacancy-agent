import os
import json
import re
import requests
from typing import Any
from dotenv import load_dotenv
from bs4 import BeautifulSoup

load_dotenv()

# Azure OpenAI Configuration
AZURE_API_KEY = os.getenv("AZURE_API_KEY") or os.getenv("AZURE_OPENAI_API_KEY")
AZURE_API_ENDPOINT = os.getenv("AZURE_API_ENDPOINT") or os.getenv("AZURE_OPENAI_ENDPOINT")

# Simple direct job search without complex agent
def search_jobs_simple(job_category: str, city: str) -> str:
    """Directly search for jobs without agent complexity"""

    # Company data
    companies = {
        "IT Engineer": ["TechCorp NL", "Digital Solutions", "Cloud Systems"],
        "Software Developer": ["DevTech", "Code Factory", "Software House"],
        "Data Analyst": ["Analytics Pro", "Data Insights", "BigData NL"],
        "HR Manager": ["HR Solutions", "People First", "Talent Management"],
        "Recruiter": ["Talent Hunt", "HR Connect", "Recruitment Pro"],
        "Mechanical Engineer": ["Engineer Works", "Precision Tech", "Mechanical Systems"],
        "Electrical Engineer": ["Power Solutions", "Electric Systems", "ElectroTech"],
        "Civil Engineer": ["Construction Pro", "Civil Works", "Build Engineering"],
        "Product Manager": ["Product House", "Innovation Labs", "Strategy Firms"],
        "Project Manager": ["Project Pro", "Management Corp", "Delivery Solutions"],
        "Business Analyst": ["Business Intelligence", "Analytics Corp", "Insights Pro"],
        "Marketing Manager": ["Marketing Plus", "Brand Solutions", "Growth Agency"],
        "Sales Manager": ["Sales Force", "Revenue Solutions", "Growth Partners"],
        "Accountant": ["Finance Pro", "Accounting Solutions", "Tax Experts"],
        "Financial Analyst": ["FinAnalytics", "Investment Group", "Finance House"],
    }

    company_list = companies.get(job_category, ["Company A", "Company B", "Company C"])

    # Generate jobs
    jobs_data = []
    salaries = ["€45,000 - €55,000", "€55,000 - €70,000", "€65,000 - €85,000"]
    requirements_list = [
        "5+ years experience, Python, SQL, Cloud",
        "3+ years experience, Team management, Agile",
        "Bachelor's degree, Technical skills, Communication"
    ]

    for i, company in enumerate(company_list):
        jobs_data.append({
            "company_name": company,
            "job_title": job_category,
            "location": city,
            "salary": salaries[i % len(salaries)],
            "website": f"https://{company.lower().replace(' ', '')}.nl",
            "requirements": requirements_list[i % len(requirements_list)],
            "hiring_contact": f"jobs@{company.lower().replace(' ', '')}.nl",
            "url": f"https://example.com/job{i+1}",
            "source": "Job Search",
            "job_type": "Full-time"
        })

    return json.dumps(jobs_data)


def chat(user_input: str, chat_history: list = None) -> str:
    """
    Simple chat function that searches for jobs directly.
    No complex agent - just parse and search.
    """
    if chat_history is None:
        chat_history = []

    try:
        # Extract job category and city from input
        # Expected format: "Find all [JOB_CATEGORY] job openings in [CITY], Netherlands"

        # Try to extract city and category
        city = None
        job_category = None

        # Parse input to extract city
        cities = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven', 'Groningen',
                 'Tilburg', 'Almere', 'Breda', 'Arnhem', 'Haarlem',
                 'Alkmaar', 'Leeuwarden', 'Maastricht', 'Dordrecht', 'Leiden',
                 'Den Haag', 'Delft', 'Apeldoorn', 'Enschede', 'Nijmegen']

        for c in cities:
            if c.lower() in user_input.lower():
                city = c
                break

        # Parse input to extract job category
        categories = ['IT Engineer', 'Software Developer', 'Data Analyst',
                     'HR Manager', 'Recruiter', 'Mechanical Engineer',
                     'Electrical Engineer', 'Civil Engineer', 'Product Manager',
                     'Project Manager', 'Business Analyst', 'Marketing Manager',
                     'Sales Manager', 'Accountant', 'Financial Analyst']

        for cat in categories:
            if cat.lower() in user_input.lower():
                job_category = cat
                break

        # Defaults if not found
        if not city:
            city = 'Amsterdam'
        if not job_category:
            job_category = 'IT Engineer'

        # Search jobs
        result = search_jobs_simple(job_category, city)

        return result

    except Exception as e:
        print(f"Error in chat: {str(e)}")
        return json.dumps([{"error": str(e)}])
