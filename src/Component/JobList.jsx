import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/JobList.css';

const jobs = [
    {
        id: 1,
        title: "Fronted developer",
        company: " Google",
        location: "Bangalore, India",
        salary: "₹12 LPA"

    },

    {
        id: 2,
        title: "Backend developer",
        company: " Microsoft",
        location: "Hyderabad, India",
        salary: "₹14 LPA"
    },
    {
        id: 3,
        title: "  Data Analyst",
        company: " Amazon",
        location: " Delhi, India",
        salary: "₹10 LPA"
    }, {
        id: 4,
        title: "  Data Scientist",
        company: " IBM",
        location: " Mumbai, India",
        salary: "₹18 LPA"
    }

];
const JobList = ({ searchTerm = '' }) => {
    const filteredJobs = searchTerm
        ? jobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())

        )
        : jobs;
    return (

        <div className="job-list-container">
            <h2>Latest Job Openings</h2>
            <div className="job-cards">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (

                        <div className="job-card" key={job.id}>
                            <h3>{job.title}</h3>
                            <p><strong>Company:</strong>{job.company}</p>
                            <p><strong>Location</strong>{job.location}</p>
                            <p><strong>Salary</strong>
                                {job.salary}</p>




                            <div className="job-buttons">
                                <Link to={`/jobs/${job.id}`}>
                                    <button className="btn-view">View Details</button>
                                </Link>
                                <Link to={`/apply/${job.id}`}>
                                    <button className="btn-apply">Apply Now</button>
                                </Link>
                            </div>



                        </div>


                    ))
                ) : (
                    <p>No matching jobs found.</p>
                )}
            </div>
        </div >
    );
};

export default JobList;
