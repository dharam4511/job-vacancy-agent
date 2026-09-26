import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';

const DUTCH_CITIES = [
  'Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven', 'Groningen',
  'Tilburg', 'Almere', 'Breda', 'Arnhem', 'Haarlem',
  'Alkmaar', 'Leeuwarden', 'Maastricht', 'Dordrecht', 'Leiden',
  'Haarlemmermeer', 'Den Haag', 'Delft', 'Apeldoorn', 'Enschede',
  'Nijmegen', 'Hengelo', 'Zaanstad', 'Hilversum',
  'Zoetermeer', 'Hoorn', 'Nieuwegein', 'Purmerend', 'Alphen aan den Rijn'
];

const JOB_CATEGORIES = [
  'IT Engineer', 'Software Developer', 'Data Analyst',
  'HR Manager', 'Recruiter', 'HR Specialist',
  'Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer',
  'Product Manager', 'Project Manager', 'Business Analyst',
  'Marketing Manager', 'Sales Manager', 'Account Executive',
  'Accountant', 'Financial Analyst', 'Controller',
  'Nurse', 'Doctor', 'Medical Professional',
  'Teacher', 'Professor', 'Educator',
  'Chef', 'Cook', 'Hospitality Manager',
  'Graphic Designer', 'UX Designer', 'Web Designer',
  'Architect', 'Construction Manager', 'Surveyor'
];

export default function CitySelector({ selectedCity, selectedJobCategory, onCityChange, onJobCategoryChange, onSearch, loading }) {
  return (
    <div className="state-selector">
      <div className="selector-content">
        <div className="selector-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={24} />
            <Briefcase size={24} />
          </div>
          <h2>Find Your Job</h2>
        </div>

        <div className="selector-input-group" style={{ flexDirection: 'column', gap: '12px' }}>
          {/* City Dropdown */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Select City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              disabled={loading}
              className="state-dropdown"
            >
              <option value="">-- Choose a city in Netherlands --</option>
              {DUTCH_CITIES.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Job Category Dropdown */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px', color: '#333' }}>
              Select Job Category
            </label>
            <select
              value={selectedJobCategory}
              onChange={(e) => onJobCategoryChange(e.target.value)}
              disabled={loading}
              className="state-dropdown"
            >
              <option value="">-- Choose a job category --</option>
              {JOB_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={onSearch}
            disabled={!selectedCity || !selectedJobCategory || loading}
            className="search-button"
            style={{ marginTop: '8px' }}
          >
            {loading ? 'Searching...' : 'Search Jobs'}
          </button>
        </div>

        <p className="selector-hint">
          Select a city and job category to find vacancies in Netherlands
        </p>
      </div>
    </div>
  );
}
