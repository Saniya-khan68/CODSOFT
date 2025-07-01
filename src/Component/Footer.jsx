import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className="footer-container">
            <div className="footer-left">
                <h2 className='footer-logo'>
                    JOBBOARD
                </h2>
                <p className='footer-desc'>
                    Connecting talent with opportunity
                </p>
            </div>
            <div className="footer-links">
                <h4>Quick-links</h4>
                <ul >
                    <li>Home</li>
                    <li>Jobs</li>
                    <li>Employers</li>
                    <li>Candidates</li>
                </ul>
            </div>
            <div className="footer-contact">
                <h4>Contact</h4>
                <p>&copy; {new Date().getFullYear()}
                    jobboard. All rightsreserved
                </p>
            </div>
        </div>
      
    </footer>
  )
}

export default Footer
