import React from 'react';
import '../style/jobcard.css';

const JobCard = ({ job }) => {
  return (
<div className="job-card ios-style-card p-4 mb-4">
  <div className="job-header">
    <h5 className="job-title">{job.job_title}</h5>
    <span className={`job-type badge ${job.job_employment_type.toLowerCase()}`}>
      {job.job_employment_type}
    </span>
  </div>
  <p className="employer-name">{job.employer_name}</p>
  <p className="location">{job.job_city}, {job.job_country}</p>
  <a
    href={job.job_apply_link}
    target="_blank"
    rel="noopener noreferrer"
    className="btn apply-btn"
  >
    Apply Now
  </a>
</div>

  );
};

export default JobCard;

