import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const ApplyForm = () => {
    const { id } = useParams();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [resume, setResume] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            jobId: id,
            fullName,
            email,
            resume,
        });
        setSubmitted(true);
    };
    return (
        <div className='apply-form'>
            <h2>Apply for job #</h2>
            {submitted ? (
                <p className='success-message'> ✅ Application submitted successfully!</p>
            ) : (
                <form onSubmit={handleSubmit} >
                    <label>
                        Full Name:
                        <input
                            type='text'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required />
                    </label>

                    <label>Email:
                        <input type=" email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>

                    <label >
                        Upload Resume:
                        <input
                            type='file'
                            accept='pdf,.doc,.docx'
                            onChange={handleFileChange}
                            required />
                    </label>

                    <button type='submit'>Submit Application</button>

                </form>
            )}


        </div>
    );
};

export default ApplyForm;
