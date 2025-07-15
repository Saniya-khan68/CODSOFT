import React from 'react'
import '../Styles/Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-left">
                    <h2 className='footer-logo'>
                        JOBBOARD
                    </h2>
                    <p className='footer-desc'>
                        JobBoard helps thousands of professionals connect with top companies every day.
                        We empower your career journey.
                    </p>

                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">🔗</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">📸</a>
                    </div>
                </div>
                <div className="footer-links">
                    <h4>Quick~links</h4>
                    <ul >
                        <li><a href="/">Home</a> </li>
                        <li><a href="/jobs"> Find Jobs</a> </li>
                        <li><a href="/employer">Post a Job</a></li>
                        <li><a href="/candidate">Candidate Dashboard</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>

                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQs</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms & Conditions</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>📧 support@jobboard.com</p>
                    <p>📞 +91-9876543210</p>
                    <p>📍 New Delhi, India</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} JobBoard. All rights reserved. | Built with ❤️ by Team JobBoard</p>
            </div>
        </footer>
    )
}

export default Footer
