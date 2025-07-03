import React, { useState } from 'react';
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
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostedJobs([...postedJobs, job]);


    setJob({
      title: '',
      company: '',
      location: '',
      salary: '',
      description: ''
    });
  };
  return (
    <div className='employer-dashboard'>
      <h2>Employer dashboard</h2>
      {user ? (
        <p>
          Welcome <strong> {user.email}</strong> 👋<br />
          you are logged in as an <strong>{user.usertype}</strong>
        </p>
      ) : (
        <p>Please login to access your dashboard</p>
      )}

      <div className="job-post-form">
        <h3>Post a new job</h3>
        <form onSubmit={handleSubmit}>

          <input type="text"
            name="title"
            placeholder='Job Title'
            value={job.title}
            onChange={handleChange}
            required />

          <input
            type='text'
            name='company'
            placeholder='Company Name'

            value={job.company}
            onChange={handleChange}
            required />
          <input
          />

          <input
            type='text'
            name='location'
            placeholder='Location'
            value={job.location}
            onChange={handleChange}
          />

          <input
            type='text'
            name='salary'
            placeholder='Salary'
            value={job.salary}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder='Job description'
            value={job.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Post Job</button>
        </form>
      </div>
      <div className="posted-jobs">
        <h3>Your posted jobs</h3>
        {postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {postedJobs.map((j, index) => (
              <li key={index}>
                <strong>{j.title}</strong> at {j.company} ({j.location})– ₹{j.salary}
                <p>{j.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeDashboard;
