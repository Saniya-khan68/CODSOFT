 
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/ApplyForm.css';

const ApplyForm = () => {
  const { id } = useParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('Please log in first.');

    const newApplication = {
      jobId: id,
      fullName,
      email,
      phone,
      coverLetter,
      resume: resume?.name || '',
      status: 'Under Review',
      appliedAt: new Date().toLocaleString(),
    };

     
    const applicationsByUser = JSON.parse(localStorage.getItem('applicationsByUser')) || {};
    const userApplications = applicationsByUser[user.email] || [];
    applicationsByUser[user.email] = [...userApplications, newApplication];
    localStorage.setItem('applicationsByUser', JSON.stringify(applicationsByUser));

     
    const applicationsByJob = JSON.parse(localStorage.getItem('applicationsByJob')) || {};
    const jobApplications = applicationsByJob[id] || [];
    applicationsByJob[id] = [...jobApplications, newApplication];
    localStorage.setItem('applicationsByJob', JSON.stringify(applicationsByJob));

    setSubmitted(true);
  };

  return (
    <div className="apply-form">
      <h2>Apply for Job #{id}</h2>

      {submitted ? (
        <p className="success-message">✅ Application submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Full Name:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>

          <label>Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>

          <label>Cover Letter:
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows="4"
              placeholder="Write something about yourself..."
            />
          </label>

          <label>Upload Resume:
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </label>

          <button type="submit">Submit Application</button>
        </form>
      )}
    </div>
  );
};

export default ApplyForm;
