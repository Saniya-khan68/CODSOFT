import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/CandidateDashboard.css';

const CandidateDashboard = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);

        if (loggedInUser) {
            const applicationsByUser = JSON.parse(localStorage.getItem('applicationsByUser')) || {};
            const userApplications = applicationsByUser[loggedInUser.email] || [];
            setAppliedJobs(userApplications);
        }
    }, []);


    return (
        <div className="candidate-dashboard">
            <h2>Candidate Dashboard</h2>

            {user ? (
                <>
                    <p>Welcome, <strong>{user.email}</strong></p>
                    <p>You are logged in as a <strong>{user.userType}
                    </strong>.</p>

                    <h3>Applied Jobs:</h3>
                    <div className="applied-jobs">
                        {appliedJobs.length > 0 ? (
                            appliedJobs.map((job, index) => (
                                <div className="job-card" key={index}>
                                    <h3>Job #{job.jobId}</h3>
                                    <p><strong>Name:</strong> {job.fullName}</p>
                                    <p><strong>Email:</strong> {job.email}</p>
                                    <p><strong>Phone:</strong> {job.phone}</p>
                                    <p><strong>Status:</strong> {job.status}</p>
                                    <p><strong>Resume:</strong> {job.resume}</p>
                                    <p><strong>Applied On:</strong> {job.appliedAt}</p>
                                    <p><strong>Cover Letter:</strong> {job.coverLetter}</p>
                                </div>
                            ))
                        ) : (
                            <p>No applications found.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Please log in to see your dashboard.</p>
            )}
        </div>
    );
};

export default CandidateDashboard;
