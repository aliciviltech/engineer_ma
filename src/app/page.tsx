"use client"
import SideBar from "./components/SideBar/SideBar";
import MainBody from "./components/MainBody/MainBody";
import { useEffect, useRef, useState } from "react";
import AllProjects from "./components/AllProjects/AllProjects";


export default function Home() {

  // ======== handle show all projects =========
  const [toggleProjects, setToggleProjects] = useState(false);
  const toggleAllProjects = ()=>{
    setToggleProjects(!toggleProjects);
    console.log(toggleProjects)
  }
  const toggleHomePage = ()=>{
    setToggleProjects(false);
  }

  // handle menu drawer
  const [showNav, setShowNav] = useState(false);
  const drawerRef = useRef<HTMLDivElement|null>(null)
  const handleMenuDrawer = ()=>{
    setShowNav(!showNav)
  }
  const closeMenuDrawer=(event:Event)=>{
    if(drawerRef.current && !drawerRef.current.contains(event.target as Node)){
      setShowNav(false)
    }
  }
  useEffect(()=>{
    if(showNav){
      document.addEventListener('click',closeMenuDrawer);
      document.addEventListener('scroll',closeMenuDrawer);
      return ()=>{
        document.removeEventListener('click',closeMenuDrawer);
        document.removeEventListener('scroll',closeMenuDrawer);
      }
    }
  },[showNav])


  return (


    <div className="Home" >
      <div className="sideBar" >
        <SideBar drawerRef={drawerRef}  showNav={showNav} handleMenuDrawer={handleMenuDrawer} toggleHomePage={toggleHomePage} />
      </div>
      {
        toggleProjects ?
        <AllProjects toggleAllProjects={toggleAllProjects}/>
        :
        <MainBody toggleAllProjects={toggleAllProjects} />
      }
    </div>
  );
}
