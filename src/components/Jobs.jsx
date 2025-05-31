import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './jobcard';
import '../style/Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [sortBy, setSortBy] = useState('Relevance');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (reset = false) => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: `${search || 'developer'} ${location}`,
        page: page,
        num_pages: 1,
        country: 'in',
        remote_jobs_only: jobType === 'Remote' ? true : false,
        sort: sortBy.toLowerCase(), // 'relevance' or 'date'
      },
      headers: {
       'x-rapidapi-key': '659829faa5msh4384bc215873709p1c693cjsn357edb3ba3ac',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      },
    };

    try {
      const response = await axios.request(options);
      if (reset) {
        setJobs(response.data.data);
      } else {
        setJobs((prevJobs) => [...prevJobs, ...response.data.data]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  // Fetch jobs on filters/search change or page change
  useEffect(() => {
    fetchJobs(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, location, jobType, sortBy]);

  // Fetch jobs on page increment for load more
  useEffect(() => {
    if (page === 1) return; // Already fetched on filters change
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs(true);
  };

  const handleJobTypeChange = (type) => {
    setJobType(type === jobType ? '' : type); // Toggle
    setPage(1);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setPage(1);
  };

  const handleLocationSelect = (city) => {
    setLocation(city);
    setPage(1);
  };

  return (
    <div className="container-fluid py-5" style={{ marginTop: '10rem' }}>
      <div className="container">
        <div className="row gy-3 align-items-center">

          {/* Search Input */}
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
                {location || 'Location'}
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

          {/* Job Type Filter */}
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

          {/* Empty col for spacing */}
          <div className="col-md-1"></div>

        </div>

        {/* Job Cards */}
        <div className="mt-5">
          <h3 className="text-primary mb-4">Latest Jobs</h3>
          {jobs.length === 0 && !loading && <p>No jobs found.</p>}
          <div className="job-grid">
          {jobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
          </div>

          {loading && <p>Loading...</p>}
        </div>
        {/* Load More */}
        {jobs.length > 0 && !loading && (
          <div className="text-center my-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage((prev) => prev + 1)}
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
