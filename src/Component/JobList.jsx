import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/JobList.css';

const jobs = [
    { id: 1, title: "Frontend Developer", company: "Google", location: "Bangalore, India", salary: "₹12 LPA" },
    { id: 2, title: "Backend Developer", company: "Microsoft", location: "Hyderabad, India", salary: "₹14 LPA" },
    { id: 3, title: "Data Analyst", company: "Amazon", location: "Delhi, India", salary: "₹10 LPA" },
    { id: 4, title: "Data Scientist", company: "IBM", location: "Mumbai, India", salary: "₹18 LPA" },
    { id: 5, title: "UI/UX Designer", company: "Zomato", location: "Pune, India", salary: "₹9 LPA" },
    { id: 6, title: "React Developer", company: "Flipkart", location: "Chennai, India", salary: "₹13 LPA" },
    { id: 7, title: "Machine Learning Engineer", company: "Nvidia", location: "Remote", salary: "₹20 LPA" },
    { id: 8, title: "Cloud Engineer", company: "Infosys", location: "Bangalore, India", salary: "₹11 LPA" },
    { id: 9, title: "Cybersecurity Analyst", company: "Wipro", location: "Kolkata, India", salary: "₹12.5 LPA" },
    { id: 10, title: "DevOps Engineer", company: "TCS", location: "Hyderabad, India", salary: "₹15 LPA" },
    { id: 11, title: "QA Engineer", company: "Paytm", location: "Noida, India", salary: "₹8 LPA" },
    { id: 12, title: "System Administrator", company: "Capgemini", location: "Ahmedabad, India", salary: "₹10 LPA" },

    // 🆕 12 More Jobs Added
    { id: 13, title: "Full Stack Developer", company: "Accenture", location: "Gurgaon, India", salary: "₹16 LPA" },
    { id: 14, title: "Mobile App Developer", company: "Swiggy", location: "Bangalore, India", salary: "₹14 LPA" },
    { id: 15, title: "Data Engineer", company: "Oracle", location: "Pune, India", salary: "₹17 LPA" },
    { id: 16, title: "SEO Specialist", company: "MakeMyTrip", location: "Delhi, India", salary: "₹7 LPA" },
    { id: 17, title: "Technical Writer", company: "Zoho", location: "Chennai, India", salary: "₹6.5 LPA" },
    { id: 18, title: "Network Engineer", company: "Cognizant", location: "Kochi, India", salary: "₹9.5 LPA" },
    { id: 19, title: "Product Manager", company: "BYJU'S", location: "Bangalore, India", salary: "₹22 LPA" },
    { id: 20, title: "Software Architect", company: "Adobe", location: "Noida, India", salary: "₹30 LPA" },
    { id: 21, title: "AI Researcher", company: "OpenAI", location: "Remote", salary: "₹40 LPA" },
    { id: 22, title: "Salesforce Developer", company: "Salesforce", location: "Mumbai, India", salary: "₹18 LPA" },
    { id: 23, title: "Blockchain Developer", company: "Polygon", location: "Remote", salary: "₹25 LPA" },
    { id: 24, title: "Game Developer", company: "Ubisoft", location: "Pune, India", salary: "₹13 LPA" },
]

const JobList = ({ searchTerm = '' }) => {
    const [savedJobs, setSavedJobs] = useState([]);
    const filteredJobs = searchTerm
        ? jobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())

        )
        : jobs;


    const toggleSaveJob = (id) => {
        setSavedJobs((prev) =>
            prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
        );
    };

    return (
        <div className="job-list-container">
            <h2>✨ Latest Job Openings</h2>
            <div className="job-cards">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div className="job-card" key={job.id}>
                            <div className="job-header">
                                <h3>{job.title}</h3>
                                <span
                                    className={`bookmark ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                                    onClick={() => toggleSaveJob(job.id)}
                                    title={savedJobs.includes(job.id) ? 'Unsave Job' : 'Save Job'}
                                >
                                    {savedJobs.includes(job.id) ? '🔖' : '📌'}
                                </span>
                            </div>

                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> {job.salary}</p>
                            <p className="posted-date">Posted {job.posted} days ago</p>

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
                    <p className="no-results">No matching jobs found.</p>
                )}
            </div>
        </div>









    );
};

export default JobList;
