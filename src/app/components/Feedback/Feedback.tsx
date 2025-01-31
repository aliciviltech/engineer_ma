'use client'
import './Feedback.css'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Carousel } from 'antd';
import { authStateCheck, getAllCommentsDoc, signin, signout, submitComment,deleteComment, CommentsTypeFirebase, DocTypeFirebase } from '@/firebase/firebaseConfig';
import { User } from 'firebase/auth'


const Feedback = () => {
    // ========================== input value / letter count ==========================
    const [inputValue, setInputValue] = useState('');
    const [letterCount, setLetterCount] = useState(0);
    const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
        setLetterCount(e.target.value.length);
    }

    // =========================== firebase =============================
    const [user, setUser] = useState<User|null>(null);
    const [allCommentsDoc, setAllCommentsDoc] = useState<CommentsTypeFirebase | null>()
    const [commentsUpdated, setCommentsUpdated] = useState(false)
    useEffect(() => {
        authStateCheck(setUser)
        const fetchComments = async () => {
            const comments = await getAllCommentsDoc();
            setAllCommentsDoc(comments)
            console.log(allCommentsDoc?.length)
        }
        fetchComments()
    }, [commentsUpdated])

    // submit comment
    const submitData = async()=>{
        console.log(user)
        const data = {userName: user?.displayName, userImageURL: user?.photoURL, userUID:user?.uid, comment:inputValue}
        await submitComment(data)
        setCommentsUpdated(!commentsUpdated);
    }

    // delete comment 
    const removeComment = async(id:string)=>{
        console.log(allCommentsDoc?.length)
        await deleteComment(id);
        setCommentsUpdated(!commentsUpdated);
    }



    // ============================ screen resolution ==============================
    const [slidesToShow, setSlidesToshow] = useState(3);
    const checkScreenF = () => {
        if (window.innerWidth > 900) {
            setSlidesToshow(3)
        } else if (window.innerWidth > 640) {
            setSlidesToshow(2)
        } else {
            setSlidesToshow(1)
        }
    }
    useEffect(() => {
        checkScreenF()
        window.addEventListener('resize', checkScreenF)
    }, [])


    return (
        <div className='Feedback min-h-[100vh] py-12 bg-black text-white' id='FeedbackSection'>

            {/* section title */}
            <div className="sectionTitle">
                <h1 className='headingH1'>Share your thoughts about Protfolio</h1>
            </div>

            {/* input section */}
            <div className="inputContainer w-[90%] md:w-[70%]  mx-auto mt-10 border border-[var(--primaryColor)] p-4 rounded-xl flex flex-col gap-4">
                <div className="row1 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
                    <Image className='h-10 w-10 rounded-full' src={`${user ? user.photoURL : '/images/blank_profile_image.png'}`} alt='profileImage' width={100} height={100} />
                    <input type="text" className='h-10 w-full sm:w-[90%] rounded-lg text-black px-4' maxLength={180} onChange={handleInput}/>
                </div>
                <div className="letterCount text-right">
                    <p className='text-sm mt-[-5px]'>{letterCount}/180</p>
                </div>
                <div className="row2 flex flex-col sm:flex-row gap-3 items-center sm:justify-end">

                    <button className={`logoutBtn btnTxt1 w-full sm:w-fit bg-[var(--primaryColor)] disabled:bg-gray-500 px-4 py-1 rounded-md`} disabled={user ? false : true} onClick={signout}>Logout</button>

                    <button className={`googleBtn btnTxt1 w-full sm:w-fit bg-[var(--primaryColor)] disabled:bg-gray-500 px-4 py-1 rounded-md`} disabled={user ? true : false} onClick={signin}>Login with Google</button>

                    <button className={`submitBtn btnTxt1 w-full sm:w-fit bg-[var(--primaryColor)] disabled:bg-gray-500 px-4 py-1 rounded-md`} disabled={user ? false : true}
                        onClick={submitData}>Submit</button>
                </div>
            </div>

            {/* comments list  */}
            <div className="commentsListSection pt-12 px-4">

                <Carousel className='p-6' arrows infinite={false} slidesToShow={slidesToShow}>
                    {
                        allCommentsDoc?.map((doc:DocTypeFirebase, index:number) => {
                            return (
                                <div key={index} className=''>
                                    <div className="itemContainer pt-2 sm:p-4 h-[270px]">
                                        <div className='item relative border border-[var(--primaryColor)] rounded-sm text-white p-3 text-center h-full flex flex-col gap-4' >
                                            <div className="header flex gap-4 items-center">
                                                <Image className='h-10 w-10 rounded-full' src={doc.data().userImageURL} alt='profileImage' width={100} height={100} />
                                                <p className='font-bold'>{doc.data().userName}</p>
                                            </div>
                                            <div className="commentText text-left">{doc.data().comment}</div>
                                            {
                                                user?.uid === doc.data().userUID && doc.data().userUID !== undefined ?
                                                <div className="removeBtn">
                                                <button className='bg-red-500 absolute bottom-8 right-4 px-2 rounded-sm' onClick={()=>removeComment(doc.id)}>Remove</button>
                                                </div>
                                                :
                                                <div></div>    
                                        }
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }   
                </Carousel>

            </div>
        </div>
    )
}

export default Feedback