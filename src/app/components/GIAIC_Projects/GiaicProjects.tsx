import React from 'react'
import './GiaicProjects.css'

const GiaicProjects = () => {
    return (
        <div className='GiaicProjects' id='GiaicProjectsSection'>
            <div className="sectionTitle">
                <h1 className='headingH1'>GIAIC Projects</h1>
                <p className='paragraphP2'>Governor Initiative of Artificial Intelligence Course {"(GIAIC)"} is an academic program initiated by Governor Sindh to teach AI courses to students of Sindh Provice of Pakistan.</p>
            </div>

            <div className="projectsContainer">

                <div className="projectCard">
                    <div className="cornerShape">
                    <i className='fa-solid fa-up-right-from-square'></i>
                    </div>
                    <div className="image">
                        <img src="/images/current_project.png" />
                    </div>
                    <div className="text">
                        <div className="title headingH3">Figma Project</div>
                        <div className="description paragraphP3">
                            This is a figma conversion project. A figma design is converted to a website.
                        </div>
                    </div>
                </div>

                <div className="projectCard ">
                <div className="cornerShape">
                        <i className='fa-solid fa-up-right-from-square'></i>
                    </div>
                    <div className="image">
                        <img src="/images/current_project.png" />
                    </div>
                    <div className="text">
                        <div className="title headingH3">Figma Project</div>
                        <div className="description paragraphP3">
                            This is a figma conversion project. A figma design is converted to a website.
                        </div>
                    </div>
                </div>
                
                <div className="projectCard">
                <div className="cornerShape">
                        <i className='fa-solid fa-up-right-from-square'></i>
                    </div>
                    <div className="image">
                        <img src="/images/current_project.png" />
                    </div>
                    <div className="text">
                        <div className="title headingH3">Figma Project</div>
                        <div className="description paragraphP3">
                            This is a figma conversion project. A figma design is converted to a website.
                        </div>
                    </div>
                </div>


            </div>



        </div>
    )
}

export default GiaicProjects