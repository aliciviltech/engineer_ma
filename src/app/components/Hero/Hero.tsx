import React from 'react'
import './Hero.css'
import 'animate.css';


const Hero = () => {
  return (
    <div className='Hero' id='heroSection'>
      <h1 >
        Hello!<br />
        {`I'm`} <span>Muhammad Ali</span>
      </h1>
      <h3>
        <i className='fa-solid fa-quote-left'></i> 
        &nbsp; Embarking on excellence <br /> in &nbsp;
        <span>
          <span className='key'>W</span>
          <span className='key'>e</span>
          <span className='key'>b</span>
          <span>-</span>
          <span className='key'>D</span>
          <span className='key'>e</span>
          <span className='key'>v</span>
          <span className='key'>e</span>
          <span className='key'>l</span>
          <span className='key'>o</span>
          <span className='key'>p</span>
          <span className='key'>m</span>
          <span className='key'>e</span>
          <span className='key'>n</span>
          <span className='key'>t</span>
        </span>
          {/* Web-Development */}  
          &nbsp;
        <i className='fa-solid fa-quote-right'></i> 
      </h3>
      <img src="/images/icons/nextjs_logo.png" alt="" />
      <img src="/images/icons/reactjs_logo.png" alt="" />
      <img src="/images/icons/javascript_logo.png" alt="" />
      <img src="/images/icons/typescript_logo.png" alt="" />
    </div>
  )
}

export default Hero