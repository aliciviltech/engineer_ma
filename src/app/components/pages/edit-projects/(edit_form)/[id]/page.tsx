'use client'
import { fetchAllProjects } from '@/firebase/firebaseConfig';
import { DocumentData } from 'firebase/firestore';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import './form.css'





type Inputs = {
    id: string
    title: string
    description: string
    category: string
    image: string
    link: string
    skillsApplied: string[]
}
const categoryOptions = [
    { label: "ReactJS", value: "reactjs" },
    { label: "NextJS", value: "nextjs" },
    { label: "Firebase", value: "firebase" },
];




const EditForm = () => {
    const params = useParams();
    const id = params.id

    // ================== fetch projects =================
    const [currentProject, setCurrentProject] = useState<DocumentData | null>();
    const getProjects = async () => {
        const allprojectdocs = await fetchAllProjects();
        const findProjectdoc = allprojectdocs.find((doc) => doc.id == id)
        setCurrentProject(findProjectdoc)
    }
    console.log(currentProject?.data())
    useEffect(() => {
        getProjects()
    }, [])



    // ==================  react hook form ===================
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({defaultValues:  {
        id: '',
        title: '',
        description: '',
        category:'',
        image: '',
        link: '',
        skillsApplied: []
    } })
    useEffect(()=>{
        reset({...currentProject?.data(), skillsApplied:[]})
    },[currentProject])
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


    return (
        <div>EditForm
            <p>ID: {id}</p>



            <form onSubmit={handleSubmit(onSubmit)} className='p-4 flex flex-col gap-2'>
                <input {...register("id", { required: true })} placeholder='id' />
                <input {...register("title", { required: true })} placeholder='title' />
                <input {...register("description", { required: true })} placeholder='description' />
                <input {...register("image", { required: true })} placeholder='image url' />
                <input {...register("link", { required: true })} placeholder='url' />
                <select {...register("category", { required: true })}>
                    <option value="" selected disabled>select category</option>
                    <option value="website">website</option>
                    <option value="app">app</option>
                </select>
                <Controller
                    rules={{ required: true }}
                    name="skillsApplied"
                    control={control}
                    render={({ field }) => (
                        <div className='flex items-center gap-4'>
                            {categoryOptions.map((option) => (
                                <label key={option.value}>
                                    <input
                                        type="checkbox"
                                        value={option.value}
                                        checked={field.value.includes(option.value)}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            field.onChange(
                                                field.value.includes(newValue)
                                                    ? field.value.filter((val) => val !== newValue) // Remove if already selected
                                                    : [...field.value, newValue] // Add if not selected
                                            );
                                        }}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )}
                />

                <input type="submit" />
            </form>



        </div>
    )
}

export default EditForm