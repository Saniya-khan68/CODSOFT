 // JobList.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/JobList.css';
import jobsData from '../assets/data/jobs.json';
import JobCard from './JobCard';

const JobList = ({ searchTerm = '', isEmployer = false }) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  useEffect(() => {
    const employerJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const myJobs = currentUser?.email ? employerJobs[currentUser.email] || [] : [];

    const publicJobs = jobsData.map(job => ({ ...job, isLocal: false }));
    const ownJobs = myJobs.map((job, i) => ({
      ...job,
      id: 1000 + i,
      isLocal: true
    }));

    setJobs([...publicJobs, ...ownJobs]);
  }, []); // ✅ Only runs once on component mount

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = searchTerm
      ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchCategory = category
      ? job.title.toLowerCase().includes(category.toLowerCase())
      : true;

    return matchSearch && matchCategory;
  });

  const handleDelete = (id) => {
    const employerJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const updatedJobs = (employerJobs[currentUser.email] || []).filter((_, i) => 1000 + i !== id);
    employerJobs[currentUser.email] = updatedJobs;
    localStorage.setItem('jobsByEmployer', JSON.stringify(employerJobs));

    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div className="job-list-container">
      <h2>Latest Job Openings</h2>
      <div className="job-cards">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              showActions={isEmployer && job.isLocal}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
