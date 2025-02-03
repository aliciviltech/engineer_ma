import FitButton from '@/app/components/Button/FitButton'
import SecondaryCard from '@/app/components/Cards/SecondaryCard';
import { fetchAllProjects, postAllProjects } from '@/firebase/firebaseConfig'
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const ProjectsList = () => {

    
    const [allProjectsDocs,setAllProjectsDocs] = useState<DocumentData[]>();
    const getProjects = async()=>{
        const projects =  await fetchAllProjects();
        setAllProjectsDocs(projects)
    }
    useEffect(()=>{
        getProjects()
    },[])
    console.log(allProjectsDocs)
  
    return (
    <div>
        <div onClick={postAllProjects}><FitButton text='Post All Projects'/>        </div>
    
        
        {
            allProjectsDocs?.map((projectDoc, index)=>{
                return(
                    <div key={index}>
                        <SecondaryCard projectDoc={projectDoc} />
                    </div>
            )})
        }

    
    </div>
  )
}

export default ProjectsList