 // JobDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import jobsData from '../assets/data/jobs.json';

const JobDetail = () => {
  const { id } = useParams();
  const jobId = parseInt(id);

  const publicJobs = jobsData.map(job => ({ ...job, isLocal: false }));

  const employerJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
  const user = JSON.parse(localStorage.getItem('user'));
  const localJobs = user?.email
    ? (employerJobs[user.email] || []).map((job, i) => ({
        ...job,
        id: 1000 + i,
        isLocal: true
      }))
    : [];

  const allJobs = [...publicJobs, ...localJobs];
  const job = allJobs.find(job => job.id === jobId);

  if (!job) return <p style={{ padding: '20px' }}>❌ Job not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description}</p>

      {/* ✅ Apply Button (Only for public jobs) */}
      {!job.isLocal && (
        <Link to={`/apply/${job.id}`}>
          <button style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Apply Now
          </button>
        </Link>
      )}
    </div>
  );
};

export default JobDetail;
