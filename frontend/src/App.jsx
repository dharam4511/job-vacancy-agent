import React, { useState } from 'react';
import { Briefcase, Zap } from 'lucide-react';
import CitySelector from './components/StateSelector';
import JobsList from './components/JobsList';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSearch = async () => {
    if (!selectedCity || !selectedJobCategory) return;

    setLoading(true);
    const searchQuery = `Find all ${selectedJobCategory} job openings in ${selectedCity}, Netherlands`;

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: searchQuery,
          history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();

      // Parse jobs from response (Azure OpenAI returns JSON)
      try {
        // Try to extract JSON from the response
        const jsonMatch = data.response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsedJobs = JSON.parse(jsonMatch[0]);
          setJobs(Array.isArray(parsedJobs) ? parsedJobs : []);
        } else {
          setJobs([]);
        }
      } catch (parseError) {
        console.log('Could not parse jobs from response');
        setJobs([]);
      }

      // Update chat history
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: searchQuery },
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to search jobs. Make sure the backend is running on http://localhost:8000');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const displayLocation = selectedCity ? `${selectedCity}, Netherlands` : 'Netherlands';

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <Briefcase size={32} className="logo-icon" />
            <div>
              <h1>Job Vacancy Agent Netherlands</h1>
              <p>Powered by Azure OpenAI</p>
            </div>
          </div>
          <div className="header-badge">
            <Zap size={16} />
            <span>AI-Powered Search</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <CitySelector
          selectedCity={selectedCity}
          selectedJobCategory={selectedJobCategory}
          onCityChange={setSelectedCity}
          onJobCategoryChange={setSelectedJobCategory}
          onSearch={handleSearch}
          loading={loading}
        />

        <JobsList
          jobs={jobs}
          loading={loading}
          state={displayLocation}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Job Vacancy Agent Netherlands © 2024 | Powered by Azure OpenAI</p>
      </footer>
    </div>
  );
}

export default App;
