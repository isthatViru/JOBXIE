import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "../style/Addjobcard.css";

const Addjobcard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="job-grid">
      {jobs.length === 0 ? (
        <p>No job data found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h5>{job.title}</h5>
            <h6>{job.company}</h6>
            <p>
              <strong style={{color:'blue'}}>Location:</strong> {job.location}
            </p>
            <div className="job-buttons">
              <button className="btn-delete" onClick={() => deleteJob(job.id)}>Delete</button>
              <NavLink to={`/Edit/${job.id}`}>
                <button className="btn-edit">Edit</button>
              </NavLink>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Addjobcard;

