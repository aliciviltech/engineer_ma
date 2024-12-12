import React from 'react'
import './Skills.css'


const Skills = () => {
    return (
        <div className='Skills' id='skillsSection'>
            <div className="sectionTitle">
                <h1 className='headingH1'>Skills</h1>
            </div>

            <div className="skillsList">
                <div className="skill">
                    <img src="/images/icons/html.png" alt="" />
                    HTML
                </div>
                <div className="skill">
                    <img src="/images/icons/css.png" alt="" />
                    CSS 
                </div>
                <div className="skill">
                    <img src="/images/icons/javascript.png" alt="" />
                    JavaScript 
                </div>
                <div className="skill">
                    <img src="/images/icons/reactjs.png" alt="" />
                    React.JS 
                </div>
                <div className="skill">
                    <img src="/images/icons/nextjs.png" alt="" />
                    Next.JS 
                </div>
                <div className="skill">
                    <img src="/images/icons/typescript.png" alt="" />
                    TypeScript 
                </div>
                <div className="skill">
                    <img src="/images/icons/firebase.png" alt="" />
                    Firebase 
                </div>
                <div className="skill">
                    <img src="/images/icons/mysql.png" alt="" />
                    MySQL 
                </div>
            </div>

        </div>
    )
}

export default Skills