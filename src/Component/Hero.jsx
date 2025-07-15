  import React from 'react';
import '../styles/Hero.css';
import { useNavigate } from 'react-router-dom';

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

const featuredJobs = [
  {
    title: 'Frontend Developer',
    company: 'TechNova',
    location: 'Remote',
    type: 'Full-Time',
    logo: '🖥️',
    tags: ['React', 'HTML', 'CSS']
  },
  {
    title: 'Backend Engineer',
    company: 'CodeVerse',
    location: 'Bangalore, India',
    type: 'Full-Time',
    logo: '🛠️',
    tags: ['Node.js', 'Express', 'MongoDB']
  },
  {
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Delhi, India',
    type: 'Part-Time',
    logo: '🎨',
    tags: ['Figma', 'Adobe XD', 'Wireframes']
  },
  {
    title: 'AI Researcher',
    company: 'BrainWave AI',
    location: 'Hyderabad',
    type: 'Full-Time',
    logo: '🧠',
    tags: ['Python', 'TensorFlow', 'NLP']
  },
];

const Hero = () => {
  const navigate = useNavigate();

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

      {/* ======= Job Categories ======= */}
      <div className="job-category-section">
        <h2 className="section-title">Popular Job Categories</h2>
        <div className="job-categories">
          {jobCategories.map((cat, index) => (
            <div key={index} className="category-card" onClick={() => handleCategoryClick(cat.path)}>
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* ======= Featured Jobs ======= */}
      <div className="featured-jobs-section">
        <h2 className="section-title">Featured Jobs</h2>
        <div className="job-cards">
          {featuredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-header">
                <span className="job-logo">{job.logo}</span>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <div className="job-tags">
                {job.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <div className="job-footer">
                <span className="job-type">{job.type}</span>
                <button className="apply-btn">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
