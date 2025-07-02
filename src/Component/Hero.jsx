import React from 'react'
import '../Styles/Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleClick =()=>{
    navigate('/jobs');
  }
  return (
    <section className='hero'>
      <h2 className='hero-title'> FIND YOUR DREAM JOB</h2>
      <p className='hero-subtitle'>Search thousandsof job listenings and connect with top employers.</p>
      <button className='hero-btn' onClick={handleClick}>EXPLORE JOBS</button>
    </section>
  );
};

export default Hero;
      