import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Signup.css';

const Signup = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: 'candidate'
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password do not match..");
            return;

        }
        console.log("User Signed up", formData);

        navigate('/login');
    }
    return (
        <div className='signup-container'>
            <h2>Create Account</h2>
            <form className='signup-form' onSubmit={handleSubmit}>
                <input type="text"
                    name='fullName'
                    placeholder='Full name'
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                />

                <input type="email"
                    name='email'
                    placeholder='Email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type='password'
                    name='confirmPassword'
                    required
                    placeholder='Confirm password'
                    value={formData.confirmPassword}
                    onChange={handleChange} />


                <select name="userType" value={formData.userType} onChange={handleChange}>

                    <option value="candidate">Candidate</option>
                    <option value="employer">Employer</option>
                </select>

                <button type='submit'>Sign-up</button>
                <p className='login-link'>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>

        </div>
    );
};

export default Signup;
