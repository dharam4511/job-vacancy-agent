import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import JobCard from './JobCard';

export default function JobsList({ jobs, loading, state }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requirements?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const exportToCSV = () => {
    if (jobs.length === 0) return;

    const headers = ['Company', 'Job Title', 'Location', 'Salary', 'Requirements', 'Contact', 'Website'];
    const rows = jobs.map(job => [
      job.company_name || '',
      job.job_title || '',
      job.location || '',
      job.salary || 'Not specified',
      job.requirements || '',
      job.hiring_contact || '',
      job.website || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jobs-${state}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="jobs-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Searching for jobs in {state}...</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="jobs-list-container">
        <div className="empty-state">
          <Search size={48} />
          <p>No jobs found yet</p>
          <p className="text-gray">Select a state and search to find opportunities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-list-container">
      <div className="jobs-list-header">
        <div className="jobs-count">
          <h3>Found {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''}</h3>
          <p className="text-gray">in {state}</p>
        </div>

        {jobs.length > 0 && (
          <button className="export-button" onClick={exportToCSV}>
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      <div className="jobs-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by job title, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, idx) => (
            <JobCard key={idx} job={job} />
          ))
        ) : (
          <div className="no-results">
            <p>No jobs match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
