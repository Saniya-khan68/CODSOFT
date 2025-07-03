import React from 'react';
import '../Styles/JobDetail.css';
import { Link, useParams } from 'react-router-dom';



const jobData = [
    {
        id: 1,
        title: "Frontend developer",
        company: "Goggle",
        location: "Bangalore, India",
        salary: "₹12 LPA",
        description: "We are looking for a skilled Fronted Developer with experience in React, HTML.CSS, and JAVASCRIPT."
    },
    {
        id: 2,
        title: "Backend developer",
        company: "Amazon",
        location: "New York, USA",
        salary: "$120,000/year",
        description: "We are looking for a skilled Backend Developer with experience in Node.js, Python,"
    }, {
        id: 3,
        title: "Full Stack developer",
        company: "Microsoft",
        location: "Seattle, USA",
        salary: "$150,000/year",
        description: "We are looking for a skilled Full Stack Developer with experience in React, Node.js"
    }, {
        id: 4,
        title: "Data Scientist",
        company: "Google",
        location: "Mountain View, USA",
        salary: "$180,000/year",
        description: "We are looking for a skilled Data Scientist with experience in Machine Learning, Python"
    }
]
const JobDetail = () => {
    const { id } = useParams();
    const job = jobData.find((job) => job.id === parseInt(id));

    if (!job) return <p>Job not found.</p>;
    return (
        <div style={{ padding: '20px' }}>
            <h2>{job.title}</h2>
            <p><strong>Company:</strong>
                {job.company}</p>
            <p><strong>Location:</strong>{job.location}</p>
            <p><strong>Salary:</strong>{job.salary}</p>
            <p><strong>Description:</strong>{job.description}</p>

            <Link to={`/apply/${job.id}`}>
                <button>Apply Now</button>
            </Link>

        </div>
    );
};

export default JobDetail;
