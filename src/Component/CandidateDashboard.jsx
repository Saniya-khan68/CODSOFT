 import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import '../Styles/CandidateDashboard.css';

const CandidateDashboard = ({ user }) => {
    const [appliedJobs] = useState([
        {
            id: 1,
            title: 'Fronted Developer',
            company: 'Tech Innovators',
            location: 'Remote',
            status: 'Under Review'
        },
        {
            id: 2,
            title: 'UI/UX Designer',
            company: 'Designify',
            location: 'Bangalore',
            status: 'Interview Scheduled'
        },
        {
            id: 3,
            title: 'Full Stack Developer',
            company: 'Tech Innovators',
            location: 'Remote',
            status: 'Under Review'
        },
        {
            id: 4,
            title: 'Data Scientist',
            company: 'Data Science Inc.',
            location: 'New York',
            status: 'Interview Scheduled'
        },
        {
            id: 5,
            title: 'Backend Developer',
            company: 'Tech Innovators',
            location: 'Remote',
            status: 'Under Review'
        }
    ]);

    return (
        <div className='candidate-dashboard'>
            <h2>Candidate Dashboard</h2>
            {user ? (
                <>
                    <p>Welcome, <strong>{user.email}</strong> 👋</p>
                    <p>You are logged in as a <strong>{user.userType}</strong>.</p>
                </>
            ) : (
                <p>Please log in to see your dashboard</p>
            )}

            <h3>Applied Jobs:</h3>
            <div className='applied-jobs'>
                {appliedJobs.map((job) => (
                    <Link to={`/job/${job.id}`} className="job-link" key={job.id}>
                        <div className="job-card">
                            <h3>{job.title}</h3>
                            <p><strong>Company: </strong>{job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Status:</strong> <span className='status'>{job.status}</span></p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CandidateDashboard;
