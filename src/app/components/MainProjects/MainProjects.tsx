import React, { useState } from 'react'
import './MainProjects.css'
import { AllProjectsData, ProjectInterface } from '@/AllProjectsData/AllProjectsData'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"


const MainProjects = ({toggleAllProjects}:{toggleAllProjects?:()=>void}) => {

    const projectDisplayCount = 6;
    const [displayProjects, setDisplayProjects] = useState(AllProjectsData.slice(0,projectDisplayCount))
    const [toggleFilter, setToggleFilter] = useState(false);
    const [filteredValues,setFilteredValues] =  useState<string[]>([]);

    type Inputs = {
        website: string;
        app: string;
        javascript: string;
        reactjs: string;
        nextjs: string;
        backend: string;
        figma: string;
        clone: string;
    }

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    // AllProjectsData.forEach((project)=>{
    //     console.log(project.skillsApplied.split(','))
    // })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const filterValues = Object.values(data).filter((value) => {
            return typeof value === 'string'
        });
        setFilteredValues(filterValues)

        if (filterValues.length !== 0) {
            const finalProjects: ProjectInterface[] = [];
            AllProjectsData.forEach((project) => {
                filterValues.forEach((filteredProject) => {
                    if (project.skillsApplied.toLowerCase().includes(filteredProject) || project.category.toLowerCase().includes(filteredProject)) {
                        finalProjects.push(project);
                    }
                })
            })
            const uniqueProjects: ProjectInterface[] = [...new Set(finalProjects)]
            setDisplayProjects(uniqueProjects.slice(0,projectDisplayCount))
        } else{
            setDisplayProjects(AllProjectsData.slice(0,projectDisplayCount))
        }
        setToggleFilter(false)
    }

    const removeFilters = ()=>{
        setDisplayProjects(AllProjectsData.slice(0,projectDisplayCount))
        setToggleFilter(false)
        setFilteredValues([])
    }

    return (
        <div className='MainProjects' id='MainProjectsSection'>
            <div className="sectionTitle">
                <h1 className='headingH1'>Main Projects</h1>
                <p className='paragraphP2'>Main projects are displayed which were made as Freelance Projects / Practice Project and Institute Projects.</p>
            </div>

            {/* ======================== filter form ====================== */}

            <div className="filterView mt-4 flex flex-col gap-4">
                <div className="filterButton w-fit" onClick={()=>setToggleFilter(!toggleFilter)}><i className="fa-solid fa-sliders"></i> Filter</div>
                {
                    filteredValues.length>0 &&
                    <div className="selectedFilters flex flex-wrap gap-2">
                        {
                            filteredValues.map((value, index)=> <p key={index} className='border border-[var(--primaryColor)] rounded-3xl px-4'>{value}</p> )   
                        }
                        <p className='border border-red-700 rounded-3xl px-4 cursor-pointer' onClick={removeFilters}> <i className='fa-solid fa-close'></i> remove all filters</p>       
                    </div>
                }
                {
                    toggleFilter &&
                    <div className="filterOptions p-6 pb-[60px] border border-[var(--primaryColor)] flex flex-wrap">
                        <ul>
                            <h3 className='headingH3'>Categories</h3>
                            <li><input id='website' {...register('website')} value={'website'} type="checkbox" /> <label htmlFor="website"> Website </label></li>
                            <li><input id='app' {...register('app')} value={'app'} type="checkbox" /><label htmlFor="app"> Mobile App</label> </li>
                        </ul>
                        <ul>
                            <h3 className='headingH3'>Skills</h3>
                            <li><input id='javascript' {...register('javascript')} value={'javascript'} type="checkbox" /><label htmlFor="javascript"> JavaScript</label> </li>
                            <li><input id='reactjs' {...register('reactjs')} value={'reactjs'} type="checkbox" /> <label htmlFor="reactjs">ReactJs</label> </li>
                            <li><input id='nextjs' {...register('nextjs')} value={'nextjs'} type="checkbox" /> <label htmlFor="nextjs">NextJs</label> </li>
                            <li><input id='backend' {...register('backend')} value={'backend'} type="checkbox" /><label htmlFor="backend"> Backend </label></li>
                        </ul>
                        <ul>
                            <h3 className='headingH3'>Design</h3>
                            <li><input id='figma' {...register('figma')} value={'figma'} type="checkbox" /><label htmlFor="figma"> Figma</label> </li>
                            <li><input id='clone' {...register('clone')} value={'clone'} type="checkbox" /><label htmlFor="clone"> Clone </label></li>
                        </ul>
                        <button className='applyFilter bg-[var(--primaryColor)] px-4 py-1 rounded-lg text-[14px] absolute bottom-4 left-4' onClick={handleSubmit(onSubmit)}>Apply</button>
                    </div>
                }


            </div>


            {/* ================================= All projects conainer =============================== */}

            <div className="projectsContainer">

                {
                    displayProjects.map((project) => {
                        return (
                            <Link className='projectCard ' key={project.id} href={project.link} target='_blank'>
                                    <div className="cornerShape">
                                        <i className='fa-solid fa-up-right-from-square'></i>
                                    </div>
                                    <div className="image">
                                        <Image src={project.image} alt='projectThumbnail' width={400} height={400} />
                                    </div>
                                    <div className="text ">
                                        <div className="title headingH3">{project.title}</div>
                                        <div className="description paragraphP3">
                                            {project.description}
                                        </div>
                                        <div className="text-sm paragraphP3 ]"><span className='text-red-500'>Skills Applied:</span> {project.skillsApplied}</div>
                                    </div>
                            </Link>
                        )
                    })
                }

            </div>

            <h1 className='headingH1 text-center border-b border-black dark:border-white w-fit self-center cursor-pointer hover:text-[var(--primaryColor)]' onClick={toggleAllProjects}>See More</h1>



        </div>
    )
}

export default MainProjects