 import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/EmployerHome.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmployerHome = ({ user }) => {
  const jobStats = [
    { name: 'Frontend', applications: 4 },
    { name: 'Backend', applications: 2 },
    { name: 'Full Stack', applications: 6 },
  ];

  const totalJobs = 0; // Replace with actual value if needed
  const totalApplications = 12;
  const lastPosted = 'N/A';

  return (
    <div className="employer-home">
      <h2 className="title">👨‍💼 Employer Control Panel</h2>
      <p className="subtitle">
        Welcome, <strong>{user?.email}</strong>
      </p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>📦 Total Jobs</h4>
          <p>{totalJobs}</p>
        </div>
        <div className="stat-card">
          <h4>📑 Applications</h4>
          <p>{totalApplications}</p>
        </div>
        <div className="stat-card">
          <h4>🕒 Last Posted</h4>
          <p>{lastPosted}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/employer/post" className="action-card">
          <h4>📤 Post a New Job</h4>
          <p>Add a fresh job listing in just a few steps.</p>
        </Link>

        <Link to="/employer/jobs" className="action-card">
          <h4>📂 Manage Jobs</h4>
          <p>Edit or delete previously posted jobs.</p>
        </Link>

        <Link to="/profile" className="action-card">
          <h4>👤 Employer Profile</h4>
          <p>Update company profile and details.</p>
        </Link>
      </div>

      <div className="recent-applications">
        <h3>👀 Recent Applications</h3>
        <ul>
          <li>Ravi Kumar applied for <strong>Frontend Developer</strong></li>
          <li>Pooja Sharma applied for <strong>React Intern</strong></li>
        </ul>
      </div>

      <div className="notifications">
        <h3>🔔 Notifications</h3>
        <ul>
          <li>You have 5 new applications.</li>
          <li>Update your company profile.</li>
        </ul>
      </div>

      <div className="chart-section">
        <h3>📊 Applications Chart</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={jobStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="applications" fill="#00cfff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="calendar-section">
        <h3>📅 Calendar</h3>
        <Calendar />
      </div>
    </div>
  );
};

export default EmployerHome;
