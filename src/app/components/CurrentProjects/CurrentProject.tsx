import React from 'react'
import './CurrentProject.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PrimaryButton } from '../Button/Button';
import Link from 'next/link';


const CurrentProject = () => {
    const percentage = 70;
    return (
        <div className='CurrentProject' id='currentProjectSection'>

            <div className="sectionTitle">
                <h1 className='headingH1'>Current Project</h1>
            </div>

            <div className="project">
                <div className="border1"></div>
                <div className="border2"></div>
                <div className="content">
                    <div className="leftCol">
                        <div className="currentProjectTitle headingH2">Blog Website</div>
                        <div className="description">This project is based on frontend as well as backend technologies. This is being created using {`"ReactJS"`} for frontend work and {`"NodeJS"`} for backend work. The data base used is {`"MongoDB"`}. It is a user friendly. A user can read blogs just by landing on the website. If any one wants to create a blog he has to signup through authentication system which is a very easy process. After creating a blog user can read, edit or delete his blog, whenever he wants.</div>
                        <Link href={'https://baitulblog.vercel.app/'} target='_blank'>
                        <PrimaryButton text='Visit' bgColor='var(--primaryColor)' textColor='white' />
                        </Link>
                    </div>
                    <div className="rightCol">
                        <div className="headingH2">Work Progress</div>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({ pathColor: 'var(--primaryColor)', textColor: 'var(--primaryColor)'})}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentProject