// React core hooks
import React, { useState, useEffect } from 'react';
// Axios for API requests
import axios from 'axios';
// Reusable component to display individual job info
import JobCard from './jobcard';
// Custom CSS for styling the Jobs section
import '../style/Jobs.css';

const Jobs = () => {
  // ===================== STATE HOOKS ======================
  const [jobs, setJobs] = useState([]);                 // Stores list of job data
  const [search, setSearch] = useState('');             // Search keyword input
  const [location, setLocation] = useState('');         // Location filter
  const [jobType, setJobType] = useState('');           // Job type filter (Remote, On-site, Hybrid)
  const [sortBy, setSortBy] = useState('Relevance');    // Sorting option (Relevance or Date)
  const [page, setPage] = useState(1);                  // Current page for pagination
  const [loading, setLoading] = useState(false);        // Loading state (for spinners/loaders)

  // ===================== API CALL FUNCTION ======================
  const fetchJobs = async (reset = false) => {
    setLoading(true); // Show loading spinner

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search', // RapidAPI endpoint for job listings
      params: {
        query: `${search || 'developer'} ${location}`, // Main query (default to 'developer')
        page: page,               // Current page number
        num_pages: 1,             // Results per fetch (can be tuned)
        country: 'in',            // Country filter (India)
        remote_jobs_only: jobType === 'Remote' ? true : false, // Only fetch remote jobs if selected
        sort: sortBy.toLowerCase(), // Convert "Relevance" or "Date" to API format: "relevance", "date"
      },
      headers: {
        'x-rapidapi-key': '659829faa5msh4384bc215873709p1c693cjsn357edb3ba3ac', // Your API key
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options); // Fetch jobs from API

      // If reset (i.e. filters/search changed), replace job list
      if (reset) {
        setJobs(response.data.data);
      } else {
        // If loading more pages, append new jobs to the existing list
        setJobs((prevJobs) => [...prevJobs, ...response.data.data]);
      }

    } catch (error) {
      console.error('Error fetching jobs:', error); // Catch any error
    }

    setLoading(false); // Hide loading spinner
  };

  // ================ FETCH JOBS WHEN FILTERS CHANGE ================
  useEffect(() => {
    fetchJobs(true); // Reset job list on filters/search change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, location, jobType, sortBy]);

  // ================ FETCH JOBS WHEN PAGE INCREASES (Load More) ================
  useEffect(() => {
    if (page === 1) return; // Page 1 is already fetched above
    fetchJobs();            // Fetch next page results without reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ================ HANDLE SEARCH FORM SUBMISSION ================
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setPage(1);         // Reset to first page
    fetchJobs(true);    // Fetch fresh jobs for the new search
  };

  // ================ HANDLE JOB TYPE TOGGLE ================
  const handleJobTypeChange = (type) => {
    // Toggle selection (Remote, On-site, Hybrid)
    setJobType(type === jobType ? '' : type); 
    setPage(1);
  };

  // ================ HANDLE SORT CHANGE ================
  const handleSortChange = (sortOption) => {
    setSortBy(sortOption); // Set sort to 'Relevance' or 'Date'
    setPage(1);
  };

  // ================ HANDLE LOCATION CHANGE ================
  const handleLocationSelect = (city) => {
    setLocation(city);
    setPage(1);
  };

  // ================ UI SECTION ================
  return (
    <div className="container-fluid py-5" style={{ marginTop: '10rem' }}>
      <div className="container">
        <div className="row gy-3 align-items-center">

          {/* Search Bar */}
          <div className="col-md-4">
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for jobs..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit" disabled={loading}>
                Search
              </button>
            </form>
          </div>

          {/* Location Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle w-100 bg-primary text-white"
                type="button"
                id="locationDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {location || 'Location'} {/* Show selected city or "Location" */}
              </button>
              <ul className="dropdown-menu" aria-labelledby="locationDropdown">
                {['Mumbai', 'Bangalore', 'Delhi'].map((city) => (
                  <li key={city}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLocationSelect(city)}
                    >
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Job Type Filter Buttons */}
          <div className="col-md-3">
            <div className="d-flex gap-3 justify-content-between">
              {['Remote', 'On-site', 'Hybrid'].map((type) => (
                <button
                  key={type}
                  className={`btn btn-outline-dark flex-grow-1 ${jobType === type ? 'active btn-primary text-white' : ''}`}
                  onClick={() => handleJobTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle w-100"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort By: {sortBy}
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                {['Relevance', 'Date'].map((option) => (
                  <li key={option}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSortChange(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Spacer */}
          <div className="col-md-1"></div>
        </div>

        {/* Job Results */}
        <div className="mt-5">
          <h3 className="text-primary mb-4">Latest Jobs</h3>

          {/* If no jobs found */}
          {jobs.length === 0 && !loading && <p>No jobs found.</p>}

          {/* Grid of job cards */}
          <div className="job-grid">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>

          {/* Loader */}
          {loading && <p>Loading...</p>}
        </div>

        {/* Load More Button (pagination) */}
        {jobs.length > 0 && !loading && (
          <div className="text-center my-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage((prev) => prev + 1)} // Load next page
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
