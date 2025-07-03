import React from 'react'
import '../Styles/Profile.css';


const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <p style={{ padding: '20px' }}> You are not logged in.</p>;
    }
    return (
        <div className='profile-container'>
            <h2>User Profile</h2>
            <div className='profile-details'>
                <p><strong>Email:</strong>{user.email}</p>
                <p><strong>User Type:</strong>{user.userType}</p>
                <p><strong>Status:</strong>Logged In ✅</p>
            </div>
        </div>
    );
};

export default Profile;
