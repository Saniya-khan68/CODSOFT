 import React, { useState, useEffect } from 'react';
import '../Styles/EmployeDashboard.css';

const EmployerDashboard = ({ user }) => {
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

      import('../assets/data/jobs.json').then(module => {
        const staticJobs = module.default || [];
        const combined = [
          ...employerJobs.map(job => ({ ...job, isEditable: true })),
          ...staticJobs.map(job => ({ ...job, isEditable: false }))
        ];
        setPostedJobs(combined);
      });
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

     
    const combined = [
      ...updated.map(job => ({ ...job, isEditable: true })),
      ...postedJobs.filter(job => !job.isEditable)
    ];
    setPostedJobs(combined);

    setJob({
      title: '',
      company: '',
      location: '',
      salary: '',
      description: ''
    });
  };

  const handleDelete = (indexToRemove) => {
    const filtered = postedJobs.filter((_, index) => index !== indexToRemove || !postedJobs[index].isEditable);
    const updated = filtered.filter(job => job.isEditable);
    const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    allJobs[user.email] = updated;
    localStorage.setItem('jobsByEmployer', JSON.stringify(allJobs));
    setPostedJobs(filtered);
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
          <input type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} required />
          <input type="text" name="company" placeholder="Company Name" value={job.company} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={job.location} onChange={handleChange} required />
          <input type="text" name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} required />
          <textarea name="description" placeholder="Job Description" value={job.description} onChange={handleChange} required></textarea>
          <button type="submit">Post Job</button>
        </form>
      </div>

      <div className="posted-jobs">
        <h3>All Jobs</h3>
        {postedJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <ul>
            {postedJobs.map((j, index) => (
              <li key={index}>
                <h4>{j.title} at {j.company}</h4>
                <p><strong>Location:</strong> {j.location}</p>
                <p><strong>Salary:</strong> {j.salary}</p>
                <p><strong>Description:</strong> {j.description}</p>
                <p><em>Posted on: {j.postedAt || 'Static Job'}</em></p>
                {j.isEditable && (
                  <>
                    <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
