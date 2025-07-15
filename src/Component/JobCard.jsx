 import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/JobCard.css'

const JobCard = (props) => {
  const {
    id,
    title,
    salary,
    location,
    company,
    isSaved,
    toggleSave,
    showActions = false,
    onDelete
  } = props;

  const posted = useMemo(() => {
    return Math.floor(Math.random() * 10);
  }, []);

  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{title}</h3>
        {toggleSave && (
          <span
            className={`bookmark ${isSaved ? 'saved' : ''}`}
            onClick={toggleSave}
            title={isSaved ? 'Unsave Job' : 'Save Job'}
          >
            {isSaved ? '🔖' : '📌'}
          </span>
        )}
      </div>

      <p><strong>Company:</strong> {company}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Salary:</strong> {salary}</p>
      <p className="posted-date">Posted {posted} days ago</p>

      <div className="job-buttons">
        <Link to={`/jobs/${id}`}>
          <button className="btn-view">View Details</button>
        </Link>

        
        {!showActions && (
          <Link to={`/apply/${id}`}>
            <button className="btn-apply">Apply Now</button>
          </Link>
        )}
 
        {showActions && (
          <>
            <button className="btn-edit">Edit</button>
            <button className="btn-delete" onClick={() => onDelete(id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
