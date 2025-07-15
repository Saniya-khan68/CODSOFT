import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/EmployerJobs.css';

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ title: '', company: '', location: '', salary: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    if (storedUser) {
      const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
      setJobs(allJobs[storedUser.email] || []);
    }
  }, []);

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    allJobs[user.email] = updatedJobs;
    localStorage.setItem('jobsByEmployer', JSON.stringify(allJobs));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(jobs[index]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedJobs = [...jobs];
    updatedJobs[editIndex] = { ...formData, postedAt: updatedJobs[editIndex].postedAt };
    setJobs(updatedJobs);
    const allJobs = JSON.parse(localStorage.getItem('jobsByEmployer')) || {};
    allJobs[user.email] = updatedJobs;
    localStorage.setItem('jobsByEmployer', JSON.stringify(allJobs));
    setEditIndex(null);
    setFormData({ title: '', company: '', location: '', salary: '', description: '' });
  };

  return (
    <div className="my-jobs-container">
      <h2>My Posted Jobs</h2>
      {jobs.length === 0 ? <p>No jobs posted yet.</p> : (
        <ul className="job-list">
          {jobs.map((job, index) => (
            <li key={index} className="job-item">
              <h3>{job.title} at {job.company}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <p><em>Posted on: {job.postedAt}</em></p>
              <div className="job-actions">
                <button onClick={() => navigate(`/employer/applications/${index}`)}>View Applicants</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editIndex !== null && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h3>Edit Job</h3>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
          <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <button type="submit">Update Job</button>
        </form>
      )}
    </div>
  );
};

export default MyPostedJobs;
