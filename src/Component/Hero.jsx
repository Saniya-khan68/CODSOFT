 import React, { useEffect, useState } from 'react';
import '../Styles/Hero.css';
import { useNavigate } from 'react-router-dom';
import jobsData from '../assets/data/jobs.json';
import JobCard from './JobCard';

const jobCategories = [
  { name: 'Frontend Development', path: '/jobs?category=frontend' },
  { name: 'Backend Development', path: '/jobs?category=backend' },
  { name: 'Database Admin', path: '/jobs?category=database' },
  { name: 'Ethical Hacking', path: '/jobs?category=hacking' },
  { name: 'UI/UX Design', path: '/jobs?category=design' },
  { name: 'AI / ML', path: '/jobs?category=ai' },
  { name: 'Cloud Computing', path: '/jobs?category=cloud' },
  { name: 'Cybersecurity', path: '/jobs?category=cybersecurity' }
];

const Hero = () => {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    const data = jobsData.slice(0, 4);
    setFeaturedJobs(data);
  }, []);

  const handleExplore = () => {
    navigate('/jobs');
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Your Dream Job Awaits</h1>
        <p className="hero-subtitle">
          Explore top opportunities from top companies. Apply now and step into your future.
        </p>
        <button className="hero-button" onClick={handleExplore}>
          Explore Jobs
        </button>
      </div>

      <div className="job-category-section">
        <h2 className="section-title">Popular Job Categories</h2>
        <div className="job-categories">
          {jobCategories.map((cat, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => handleCategoryClick(cat.path)}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      <div className="featured-jobs-section">
        <h2 className="section-title">Featured Jobs</h2>
        <div className="job-cards">
          {featuredJobs.map((job, index) => (
            <JobCard key={job.id || index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
