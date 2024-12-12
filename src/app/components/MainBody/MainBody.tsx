import React, { useEffect, useState } from 'react'
import './MainBody.css'
import Hero from '../Hero/Hero'
import About from '../About/About'
import CurrentProject from '../CurrentProjects/CurrentProject'
import GiaicProjects from '../GIAIC_Projects/GiaicProjects'
import Skills from '../Skills/Skills'

const MainBody = () => { 
  const [moveTopBtn, setMoveTopBtn]=useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>100 || document.documentElement.scrollTop > 100){
        setMoveTopBtn(true);
      } else{
        setMoveTopBtn(false);
      }
    })
  },[])

  return (
    <div className='MainBody'>
        <Hero/>
        <About/>
        <Skills/>
        <CurrentProject/>
        <GiaicProjects/>
        {
          moveTopBtn &&
        <div className="moveToTop" onClick={()=>{window.scrollTo({top:0})}}>
          <i className='fa-solid fa-angle-up'></i>
        </div>
        }
    </div>
  )
}

export default MainBody