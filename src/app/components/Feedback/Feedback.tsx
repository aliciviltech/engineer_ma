'use client'
import './Feedback.css'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Carousel } from 'antd';
import { authStateCheck, getAllCommentsDoc, signin, signout, submitComment, deleteComment, CommentsTypeFirebase, DocTypeFirebase } from '@/firebase/firebaseConfig';
import { User } from 'firebase/auth'
import ClassicLoader from '../Loaders/ClassicLoader/ClassicLoader';
import emailjs from 'emailjs-com'


const Feedback = () => {


    // ===================== use states =============================
    const [submitBtn, setSubmitBtn] = useState('Submit');
    const [removeBtn, setRemoveBtn] = useState('Remove');
    const [showLoader, setShowLoader] = useState(false);


    // ========================== input value / letter count ==========================
    const [inputValue, setInputValue] = useState('');
    const [letterCount, setLetterCount] = useState(0);
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setLetterCount(e.target.value.length);
    }

    // ========================= send email to my self =========================================
    const sendEmail = async () => {
        try {
            await emailjs.send('service_o5pruu8', 'template_dlhfnkh', {
                from_name: user?.displayName,
                title: 'Portfolio Feedback Form',
                message: inputValue,
                reply_to: user?.email
            }, '-qLJHCUBragPdE0qZ');

        } catch (error) {
            alert(`Error: ${error}`)
        }
    }

    // =========================== firebase =============================
    const [user, setUser] = useState<User | null>(null);
    const [allCommentsDoc, setAllCommentsDoc] = useState<CommentsTypeFirebase | null>()
    const [commentsUpdated, setCommentsUpdated] = useState(false)
    useEffect(() => {
        authStateCheck(setUser)
        const fetchComments = async () => {
            const comments = await getAllCommentsDoc();
            setAllCommentsDoc(comments)
            setShowLoader(false)
            console.log(allCommentsDoc?.length)
        }
        fetchComments()
    }, [commentsUpdated])

    // submit comment
    const submitData = async () => {
        setSubmitBtn('loading...')
        console.log(user)
        const data = { userName: user?.displayName, userImageURL: user?.photoURL, userUID: user?.uid, comment: inputValue }
        await submitComment(data)
        setCommentsUpdated(!commentsUpdated);
        sendEmail()
        setSubmitBtn('Submit')
        setInputValue('')
    }

    // delete comment 
    const removeComment = async (id: string) => {
        setShowLoader(true)
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
        <div className='Feedback min-h-[100vh] py-12 px-4 dark:bg-black dark:text-white' id='FeedbackSection'>

            {/* section title */}
            <div className="sectionTitle">
                <h1 className='headingH1'>Share your thoughts about Protfolio</h1>
            </div>

            {/* input section */}
            <div className="inputContainer w-[100%] text-white  bg-[#1d1d1d] md:w-[70%]  mx-auto mt-10  p-4 rounded-xl flex flex-col gap-4">
                <div className="row1 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
                    <Image className='h-10 w-10 rounded-full' src={`${user ? user.photoURL : '/images/blank_profile_image.png'}`} alt='profileImage' width={100} height={100} />
                    <input type="text" className='h-10 w-full sm:w-[90%] rounded-lg border border-[var(--inputBorder)] text-black px-4' maxLength={180} onChange={handleInput} />
                </div>
                <div className="letterCount text-right">
                    <p className='text-sm mt-[-5px]'>{letterCount}/180</p>
                </div>
                <div className="row2 flex flex-col sm:flex-row gap-3 items-center sm:justify-end">

                    <button className={`logoutBtn btnTxt1 w-full sm:w-fit bg-[var(--primaryColor)] disabled:bg-gray-400 px-4 py-1 rounded-md`} disabled={user ? false : true} onClick={signout}>Logout</button>

                    <button className={`googleBtn btnTxt1 w-full sm:w-fit bg-[var(--primaryColor)] disabled:bg-gray-400 px-4 py-1 rounded-md`} disabled={user ? true : false} onClick={signin}>Login with Google</button>

                    <button className={`submitBtn btnTxt1 w-full sm:w-fit bg-[var(--primaryColor)] disabled:bg-gray-400 px-4 py-1 rounded-md`} disabled={user ? false : true}
                        onClick={submitData}>{submitBtn}</button>
                </div>
            </div>

            {/* comments list  */}
            <div className="commentsListSection relative pt-12 w-full ">
                {
                    (allCommentsDoc as CommentsTypeFirebase)?.length > 0 && showLoader==false
                        ?
                        <Carousel className='px-6 py-10' arrows infinite={false} slidesToShow={slidesToShow}>
                            {
                                allCommentsDoc?.map((doc: DocTypeFirebase, index: number) => {
                                    return (
                                        <div key={index} className=''>
                                            <div className="itemContainer pt-2 sm:p-4 h-[270px]">
                                                <div className='item relative bg-[#e6d9bc] text-black rounded-lg p-3 text-center h-full flex flex-col gap-4' >
                                                    <div className="header flex gap-4 items-center bg-[var(--primaryColor)] text-white p-2 rounded-[30px]">
                                                        <Image className='h-10 w-10 rounded-full' src={doc.data().userImageURL} alt='profileImage' width={100} height={100} />
                                                        <p className=''>{doc.data().userName}</p>
                                                    </div>
                                                    <div className="commentText text-left">{doc.data().comment}</div>
                                                    {
                                                        user?.uid === doc.data().userUID && doc.data().userUID !== undefined ?
                                                            <div className="removeBtn">
                                                                <button className='bg-red-500 absolute bottom-8 right-4 px-2 rounded-sm' onClick={() => removeComment(doc.id)}>{removeBtn}</button>
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
                        :
                        <ClassicLoader />
                }

            </div>
        </div>
    )
}

export default Feedback