import React from 'react'
import '../Styles/JobDetail..css'
import { useParams } from 'react-router-dom'


const jobData = [
    {
        id: 1,
        title: "Frontend developer",
        company: "Goggle",
        location: "Bangalore, India",
        salary: "₹12 LPA",
        description: "We are looking for a skilled Fronted Developer with experience in React, HTML.CSS, and JAVASCRIPT."
    },
]
const JobDetail = () => {
    const { id } = useParams();
    const job = jobData.find((job) => job.id === parseInt(id));

    if (!job) return <p>Job not found.</p>
    return (
        <div >
            <h2>{job.title}</h2>
            <p><strong>Comapny:</strong>
                {job.company}</p>
            <p><strong>Location:</strong>{job.location}</p>
            <p><strong>Salary:</strong>{job.salary}</p>
            <p><strong>Description</strong>{job.description}</p>

            <Link to={`/apply/${job.id}`}>
                <button>Apply Now</button>
            </Link>

        </div>
    );
};

export default JobDetail
