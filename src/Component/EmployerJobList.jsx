import React, { useEffect, useState } from 'react';
import jobsData from '../assets/data/jobs.json';
import '../Styles/EmployerJobList.css';

const EmployerJobList = ({ user }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const posted = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    const employerJobs = posted[user.email] || [];
 
    const combined = [
      ...jobsData.map(job => ({ ...job, source: 'static' })),
      ...employerJobs.map((job, index) => ({ ...job, source: 'posted', index }))
    ];

    setJobs(combined);
  }, [user]);

  const handleDelete = (index) => {
    const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    const updated = (allJobs[user.email] || []).filter((_, i) => i !== index);
    allJobs[user.email] = updated;
    localStorage.setItem('jobsByEmployer', JSON.stringify(allJobs));
    window.location.reload();
  };

  return (
    <div className="employer-jobs-container">
      <h2>Your Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="job-cards">
          {jobs.map((job, i) => (
            <div className="job-card" key={i}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Description:</strong> {job.description}</p>
              {job.source === 'posted' && (
                <div className="job-actions">
                  <button className="edit-btn" disabled>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(job.index)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerJobList;
