'use client'
import React, { LegacyRef, useEffect, useState } from 'react'
import './SideBar.css'
import Link from 'next/link'
import { authStateCheck } from '@/firebase/firebaseConfig'
import { User } from 'firebase/auth'

interface SideBarProps {
    drawerRef: LegacyRef<HTMLDivElement> | undefined,
    showNav: boolean,
    handleMenuDrawer: () => void,
    toggleHomePage: () => void,
}


const SideBar: React.FC<SideBarProps> = ({ drawerRef, showNav, handleMenuDrawer, toggleHomePage }) => {
    const [expandSideBar, setExpandSideBar] = useState(true);
    const handleMenuLink = () => {
        handleMenuDrawer();
        toggleHomePage();
    }


    //=============== check auth login status =================
    const [user, setUser] = useState<User | null>(null);
    const checkUser = () => {
        authStateCheck(setUser)
    }
    useEffect(() => {
        checkUser()
    }, [])



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
                    {
                        user?.uid == 'cWmylgFH80OAUpM4tRdNbmHlMny1' &&
                    <Link href={'/components/pages/edit-projects'} target='_blank' className='navLink' > <i className='fa-solid fa-pen'></i>{expandSideBar && "Edit Projects"}</Link>
                    }    
                </div>
            </div>
        </div >
    )
}

export default SideBar