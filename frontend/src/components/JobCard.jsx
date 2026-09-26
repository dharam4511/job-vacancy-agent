import React from 'react';
import { MapPin, DollarSign, Briefcase, Globe, Mail, Phone } from 'lucide-react';

export default function JobCard({ job }) {
  const handleContactClick = (contact) => {
    if (contact && contact.includes('@')) {
      window.location.href = `mailto:${contact}`;
    } else if (contact && contact.includes('+')) {
      window.location.href = `tel:${contact}`;
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.job_title || 'Job Opening'}</h3>
          <p className="company-name">{job.company_name || 'Company Name'}</p>
        </div>
        {job.website && (
          <a href={job.website} target="_blank" rel="noopener noreferrer" className="company-website">
            <Globe size={20} />
          </a>
        )}
      </div>

      <div className="job-details">
        {job.location && (
          <div className="detail-item">
            <MapPin size={18} />
            <span>{job.location}</span>
          </div>
        )}

        {job.salary && job.salary !== 'Not specified' && (
          <div className="detail-item">
            <DollarSign size={18} />
            <span>{job.salary}</span>
          </div>
        )}
      </div>

      {job.requirements && (
        <div className="requirements-section">
          <div className="section-title">
            <Briefcase size={16} />
            <span>Requirements</span>
          </div>
          <div className="requirements-list">
            {job.requirements.split(',').map((req, idx) => (
              <span key={idx} className="requirement-tag">
                {req.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="job-card-footer">
        {job.hiring_contact && (
          <button
            className="contact-button"
            onClick={() => handleContactClick(job.hiring_contact)}
            title={job.hiring_contact}
          >
            <Mail size={16} />
            <span>Contact</span>
          </button>
        )}

        {job.url && (
          <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-button">
            <span>Apply Now</span>
          </a>
        )}
      </div>
    </div>
  );
}
