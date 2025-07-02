import React, { useState } from 'react'
import '../Styles/CandidateDashboard.css';

const CandidateDashboard = ({ user }) => {
    const [appliedJobs] = useState(
        [
            {
                title: 'Fronted Developer',
                company: 'Tech Innovators',
                location: 'Remote',
                status: 'Under Review'
            },
            {
                title: 'UI/UX Designer',
                company: 'Designify',
                location: 'Bangalore',
                status: 'Interview Scheduled'
            }
        ]
    )
    return (
        <div className='candidate-dashboard'>
            <h2>Candidate Dashboard</h2>
            {user ? (
                <>
                    <p>Welcome , <strong> {user.email}</strong> 👋</p>
                    <p>You are logged in as a <strong> {user.userType}</strong>.</p>
                </>

            ) : (
                <p> Please log in to see your dashboard</p>
            )}
            <h3>Applied Jobs:</h3>
            <div className='applied-jobs'>
                {appliedJobs.map((job, index) => (
                    <div className="job-card" key={index}>
                        <h3>{job.title}</h3>
                        <p><strong>Company : </strong>{job.company}</p>
                        <p><strong>Location:</strong>{job.location}</p>
                        <p><strong>Status :</strong> <span className='status'>{job.status}</span> </p>
                    </div>


                ))}


            </div>
        </div>


    );
};

export default CandidateDashboard;
