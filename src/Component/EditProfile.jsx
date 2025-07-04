import React, { useEffect, useState } from 'react'
import '../Styles/EditProfile.css';


const EditProfile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        userType: 'Candidate'
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setFormData(user);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(formData));
        alert('✅ Profile updated successfully!');
    }
    return (
        <div className='edit-profile-container'>
            <h2>Edit profile</h2>
            <form className='edit-profile-form' onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required />

                </label>
                <label>Email:
                    <input type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    User Type:
                    <select name="userType" value={formData.userType} onChange={handleChange}>
                        <option value="Candidate">Candidate</option>
                        <option value="Employer">Employer</option>
                    </select>
                </label>
                <button type='submit'>Save Changes</button>

            </form>

        </div>
    )
}

export default EditProfile
