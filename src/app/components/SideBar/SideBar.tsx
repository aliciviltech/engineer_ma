import React, { LegacyRef, useState } from 'react'
import './SideBar.css'
import Link from 'next/link'

const SideBar = ({ drawerRef, showNav, handleMenuDrawer, toggleHomePage }: { drawerRef: LegacyRef<HTMLDivElement> | undefined, showNav: boolean, handleMenuDrawer: () => void, toggleHomePage: () => void }) => {
    const [expandSideBar, setExpandSideBar] = useState(true);
    const handleMenuLink = () => {
        handleMenuDrawer();
        toggleHomePage();
    }
    return (
        <div className={`SideBar ${expandSideBar ? "wideSideBar" : "narrowSideBar"} `}>

            {/* toggle bars */}
            <div className="sideBarToggle" onClick={() => { setExpandSideBar(!expandSideBar) }}> <i className='fa-solid fa-bars'></i> </div>

            {/* image and name */}
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
                            <Link href={'https://github.com/aliciviltech'} target='_blank'><i className='fa-brands fa-github'></i></Link>
                            <Link href={'https://www.linkedin.com/in/muhammad-ali-2b31662b0/'} target='_blank'><i className='fa-brands fa-linkedin'></i></Link>
                            <Link href={'https://www.youtube.com/@INFONET57'} target='_blank'><i className='fa-brands fa-youtube'></i></Link>
                        </div>
                    </div>
                }

                {/* menubars */}
                <div className="menuDropDown" onClick={handleMenuDrawer}>
                    {
                        // showNav ? <FontAwesomeIcon icon={faArrowRightFromBracket} /> : <FontAwesomeIcon icon={faAngleDown} />
                        <i className='fa-solid fa-bars'></i>

                    }
                </div>

                {/* anchor tags */}
                <div ref={drawerRef} className={`nav ${showNav ? "showNav" : "hideNav"}`} >
                    <i className='iconClose fa-solid fa-close' onClick={handleMenuLink}></i>
                    <Link href={'#heroSection'} className='navLink' onClick={handleMenuLink}> <i className='fa-solid fa-home'></i> {expandSideBar && "Home"}</Link>
                    <Link href={'#aboutSection'} className='navLink' onClick={handleMenuLink}> <i className='fa-solid fa-circle-info'></i>{expandSideBar && "About me"}</Link>
                    <Link href={'#skillsSection'} className='navLink' onClick={handleMenuLink}><i className='fa-solid fa-book'></i> {expandSideBar && "Skills"}</Link>
                    <Link href={'#currentProjectSection'} className='navLink' onClick={handleMenuLink}>  <i className='fa-solid fa-spinner'></i>{expandSideBar && "Current Project"}</Link>
                    <Link href={'#MainProjectsSection'} className='navLink' onClick={handleMenuLink}> <i className='fa-solid fa-briefcase'></i>{expandSideBar && "Main Projects"}</Link>
                    <Link href={'#FeedbackSection'} className='navLink' onClick={handleMenuLink}><i className='fa-solid fa-comment'></i>{expandSideBar && "Feedback"}</Link>
                    <Link href={'https://www.linkedin.com/in/muhammad-ali-2b31662b0/'} target='_blank' className='navLink' > <i className='fa-brands fa-linkedin'></i>{expandSideBar && "Go to LinkedIn"}</Link>
                </div>
            </div>
        </div >
    )
}

export default SideBar