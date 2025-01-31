import React, { useEffect, useState } from 'react'
import './MainBody.css'
import Hero from '../Hero/Hero'
import About from '../About/About'
import CurrentProject from '../CurrentProjects/CurrentProject'
import Skills from '../Skills/Skills'
import Feedback from '../Feedback/Feedback'
import Weather from '../Weather/Weather'
import Footer from '../Footer/Footer'
import MainProjects from '../MainProjects/MainProjects'

const MainBody = ({toggleAllProjects}:{toggleAllProjects:()=>void}) => {
  const [moveTopBtn, setMoveTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        setMoveTopBtn(true);
      } else {
        setMoveTopBtn(false);
      }
    })
  }, [])

  return (
    <div className='MainBody'>
      <Hero />
      <About />
      <Skills />
      <Weather/>
      <CurrentProject />
      <MainProjects toggleAllProjects={toggleAllProjects}/>
      <Feedback/>
      <Footer/>
      {
        moveTopBtn &&
        <div className="moveToTop" onClick={() => { window.scrollTo({ top: 0 }) }}>
          <i className='fa-solid fa-angle-up'></i>
        </div>
      }

      
    </div>
  )
}

export default MainBody