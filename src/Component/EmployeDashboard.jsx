
import React, { useState, useEffect } from 'react';

import '../Styles/EmployeDashboard.css';

const EmployeDashboard = ({ user }) => {
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  });

  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
      const employerJobs = allJobs[user.email] || [];
      setPostedJobs(employerJobs);
    }
  }, [user]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      ...job,
      postedAt: new Date().toLocaleString(),
    };

    const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    const existing = allJobs[user.email] || [];
    const updated = [...existing, newJob];
    allJobs[user.email] = updated;
    localStorage.setItem('jobsByEmployer', JSON.stringify(allJobs));
    setPostedJobs(updated);

    setJob({
      title: '',
      company: '',
      location: '',
      salary: '',
      description: ''
    });
  };

  const handleDelete = (indexToRemove) => {
    const updated = postedJobs.filter((_, index) => index !== indexToRemove);
    const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    allJobs[user.email] = updated;
    localStorage.setItem('jobsByEmployer', JSON.stringify(allJobs));
    setPostedJobs(updated);
  };


  return (
    <div className='employer-dashboard'>

      <div className='neon-shape shape1'></div>
      <div className='neon-shape shape2'></div>


      <h2>Employer Dashboard</h2>
      {user ? (
        <p>
          Welcome <strong>{user.email}</strong> 👋<br />
          You are logged in as an <strong>{user.userType}</strong>.
        </p>
      ) : (
        <p>Please login to access your dashboard</p>
      )}

      <div className="job-post-form">
        <h3>Post a New Job</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={job.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Post Job</button>
        </form>
      </div>

      <div className="posted-jobs">
        <h3>Your Posted Jobs</h3>
        {postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {postedJobs.map((j, index) => (
              <li key={index}>
                <h4>{j.title} at {j.company}</h4>
                <p><strong>Location:</strong> {j.location}</p>
                <p><strong>Salary:</strong> {j.salary}</p>
                <p><strong>Description:</strong> {j.description}</p>
                <p><em>Posted on: {j.postedAt}</em></p>
                <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeDashboard;
