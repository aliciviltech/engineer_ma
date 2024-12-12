import React, { useState } from 'react'
import './SideBar.css'
import Link from 'next/link'

const SideBar = () => {
    const [expandSideBar, setExpandSideBar] = useState(true);
    const [showNav, setShowNav] = useState(false);
    return (
        <div className={`SideBar ${expandSideBar ? "wideSideBar" : "narrowSideBar"} `}>
            <div className="sideBarToggle" onClick={() => { setExpandSideBar(!expandSideBar) }}> <i className='fa-solid fa-bars'></i> </div>
            {
                expandSideBar &&
                <div className="image">
                    <div className="myPicture">
                        <img src="/images/myPicture.png" alt="myPic" />
                    </div>
                </div>

            }
            <div className="text">
                {
                    expandSideBar &&
                    <div className="heading">
                        <div className="name"><span>Engineer</span> MA</div>
                        <div className="socialLinks">
                        <i className='fa-brands fa-github'></i>
                        <i className='fa-brands fa-linkedin'></i>
                        <i className='fa-brands fa-youtube'></i>
                        <i className='fa-brands fa-facebook'></i>
                        </div>
                    </div>
                }

                <div className="menuDropDown" onClick={() => { setShowNav(!showNav) }}>
                    {
                        // showNav ? <FontAwesomeIcon icon={faArrowRightFromBracket} /> : <FontAwesomeIcon icon={faAngleDown} />
                        <i className='fa-solid fa-bars'></i>
                        
                    }
                </div>

                <div className={`nav ${showNav ? "showNav" : "hideNav"}`}>
                    <i className='iconClose fa-solid fa-close' onClick={()=>{setShowNav(!showNav) }}></i>
                    <Link href={'#heroSection'} className='navLink' > <i className='fa-solid fa-home'></i> {expandSideBar && "Home"}</Link>
                    <Link href={'#aboutSection'} className='navLink'> <i className='fa-solid fa-circle-info'></i>{expandSideBar && "About me"}</Link>
                    <Link href={'#skillsSection'} className='navLink'><i className='fa-solid fa-book'></i> {expandSideBar && "Skills"}</Link>
                    <Link href={'#currentProjectSection'} className='navLink'>  <i className='fa-solid fa-spinner'></i>{expandSideBar && "Current Project"}</Link>
                    <Link href={'#GiaicProjectsSection'} className='navLink'>  <img src="/images/icons/giaic.png"  />{expandSideBar && "GIAIC Projects"}</Link>
                    <Link href={'#'} className='navLink'> <i className='fa-solid fa-briefcase'></i>{expandSideBar && "All Projects"}</Link>
                    <Link href={'#'} className='navLink'><i className='fa-solid fa-comment'></i>{expandSideBar && "Feedback"}</Link>
                    <Link href={'#'} className='navLink'> <i className='fa-solid fa-linkedin'></i>{expandSideBar && "Go to LinkedIn"}</Link>
                </div>
            </div>
        </div>
    )
}

export default SideBar