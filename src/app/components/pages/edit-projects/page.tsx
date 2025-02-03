'use client'
import { authStateCheck } from '@/firebase/firebaseConfig'
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import ProjectsList from './ProjectsList/ProjectsList';

const EditProjects = () => {

    const [user, setUser] = useState<User|null>(null);
    const checkUser = ()=>{
        authStateCheck(setUser)
    }
    useEffect(()=>{
        checkUser()
    },[])

    if(user?.uid == "cWmylgFH80OAUpM4tRdNbmHlMny1"){
      return (
        <div className='EditProjects'>
            Edit projects      
            {user?.uid}
            <ProjectsList/>
        </div>
      )
    }else if(user == null){
      return (
        <div className='EditProjects'>
            Loading...
        </div>
      )
    } else{
      return(
        <div>page not found</div>
      )
    }

  
}

export default EditProjects