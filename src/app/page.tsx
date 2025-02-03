"use client"
import SideBar from "./components/SideBar/SideBar";
import MainBody from "./components/MainBody/MainBody";
import { useEffect, useRef, useState } from "react";
import AllProjects from "./components/AllProjects/AllProjects";
import Image from "next/image";


export default function Home() {

  // ======== toggle dark mode ==========
  const [themeMode, setThemeMode] = useState("light");
  const toggleDark = () => {
    const newMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newMode)
    document.documentElement.classList.toggle('dark', newMode === "dark");
  }
  useEffect(()=>{
    toggleDark()
  },[])

  // =========== handel theme changer ===========
  const handleTheme = (color:string)=>{
    document.documentElement.style.setProperty('--primaryColor',color)
  }

  // ======== handle show all projects =========
  const [toggleProjects, setToggleProjects] = useState(false);
  const toggleAllProjects = () => {
    setToggleProjects(!toggleProjects);
    console.log(toggleProjects)
  }
  const toggleHomePage = () => {
    setToggleProjects(false);
  }

  // handle menu drawer
  const [showNav, setShowNav] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const handleMenuDrawer = () => {
    setShowNav(!showNav)
  }
  const closeMenuDrawer = (event: Event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setShowNav(false)
    }
  }
  useEffect(() => {
    if (showNav) {
      document.addEventListener('click', closeMenuDrawer);
      document.addEventListener('scroll', closeMenuDrawer);
      return () => {
        document.removeEventListener('click', closeMenuDrawer);
        document.removeEventListener('scroll', closeMenuDrawer);
      }
    }
  }, [showNav])


  return (
    <div className="Home" >
      <div className="sideBar" >
        <SideBar drawerRef={drawerRef} showNav={showNav} handleMenuDrawer={handleMenuDrawer} toggleHomePage={toggleHomePage} />
      </div>
      {
        toggleProjects ?
          <AllProjects toggleAllProjects={toggleAllProjects} />
          :
          <MainBody toggleAllProjects={toggleAllProjects} />
      }
      <div className="switchMode fixed right-2 z-10 sm:right-10 top-6 cursor-pointer rotate-[-20deg] hover:rotate-[20deg]" onClick={toggleDark}>
        {
          themeMode === 'dark' ?
          <Image src={'/images/icons/light.png'} alt="icon" width={30} height={30}/>
          :
          <Image src={'/images/icons/moon.png'} alt="icon" width={30} height={30}/>
        }
      </div>
      <div className="themeBtn group  z-10 fixed right-2 sm:right-10 top-20 flex flex-col gap-4 cursor-pointer">
        <Image  src={'/images/icons/theme_btn.png'} alt="icon" width={30} height={30}/>
        <div className="colorChoices absolute top-[30px] right-[-200px] pt-4 group-hover:right-0 transition-all flex flex-col gap-2">
          <div className="color w-16 h-4 bg-[#00bed0]" onClick={()=>handleTheme('#00bed0')}></div>
          <div className="color w-16 h-4 bg-[#8f0226]" onClick={()=>handleTheme('#8f0226')}></div>
          <div className="color w-16 h-4 bg-[#012f6a]"  onClick={()=>handleTheme('#012f6a')}></div>
          <div className="color w-16 h-4 bg-[#00774f]" onClick={()=>handleTheme('#00774f')}></div>
          <div className="color w-16 h-4 bg-[teal]" onClick={()=>handleTheme('teal')}></div>
          <div className="color w-16 h-4 bg-[#4e2700]" onClick={()=>handleTheme('#4e2700')}></div>
          <div className="color w-16 h-4 bg-[#a77b01]" onClick={()=>handleTheme('#a77b01')}></div>
        </div>
      </div>
    </div>
  );
}
