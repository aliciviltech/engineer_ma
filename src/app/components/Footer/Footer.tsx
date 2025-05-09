import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import PrimaryModal from '../Modals/PrimaryModal';
import emailjs from 'emailjs-com'


const Footer = () => {

    // ========================== interfaces =======================
    // consultation form
    type Inputs = {
        name: string;
        email: string;
        phone: string;
        message: string;
    }
    
    // ===================== use states =============================
    const [sendBtn, setSendBtn] = useState('Send');
    const [modal, setModal] = useState(false);
    const [userInputs, setUserInputs] = useState<Inputs>()


    // current year
    const currentYear = new Date().getFullYear()

    // Handle modal
    const handleModal = () => {
        setModal(true)
    }
    

    // =========================== email function ============================

    const sendEmail = async (data: Inputs) => {
        setSendBtn('Sending...')
        try {
            await emailjs.send('service_o5pruu8', 'template_dlhfnkh', {
                from_name: data.name,
                title: 'Portfolio contact form',
                message: data.message,
                phone: data.phone,
                reply_to: data.email
            }, '-qLJHCUBragPdE0qZ');
            setUserInputs(data)
            handleModal()
            setSendBtn('Send')
            reset()

        } catch (error) {
            alert(`Error: ${error}`)
        }
    }

    const {
        register,
        handleSubmit,
        reset
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        sendEmail(data)
    }






    return (
        <div className="Footer bg-[#1d1d1d] text-[var(--primaryTextColor)]">


            {/* upper row */}
            <div className='UpperSection  py-28 px-4 sm:px-10 lg:px-20 flex flex-wrap md:flex-nowrap gap-x-10 gap-y-20 md:gap-0 justify-around md:justify-between'>
                {/* col-1 */}
                <div className="col1 flex flex-col gap-8">
                    <div className="name font-[orbitron] text-2xl text-[var(--primaryColor)]"><span className='font-[windsong] text-white font-bold'>Engineer</span> MA</div>
                    <div className="number">+92-316-0901449</div>
                    <div className="email">ali.civiltech@gmail.com</div>
                    <div className="socialIcons text-black flex gap-4 items-center">
                        <Link href={'https://github.com/aliciviltech'} target='_blank' className='bg-white px-2 py-1 rounded-sm hover:bg-transparent transition-colors'><i className='fa-brands fa-github'></i></Link>
                        <Link href={'https://www.linkedin.com/in/muhammad-ali-2b31662b0/'} target='_blank' className='bg-white px-2 py-1 rounded-sm hover:bg-transparent transition-colors'><i className='fa-brands fa-linkedin'></i></Link>
                        <Link href={'https://www.youtube.com/@INFONET57'} target='_blank' className='bg-white px-2 py-1 rounded-sm hover:bg-transparent transition-colors'><i className='fa-brands fa-youtube'></i></Link>
                        <Link href={''} className='bg-white px-2 py-1 rounded-sm hover:bg-transparent transition-colors'><i className='fa-brands fa-facebook'></i></Link>
                    </div>
                </div>

                {/* col-2 */}
                <div className="col2 w-full sm:w-fit flex flex-col items-center gap-8">
                    <h1 className='text-[22px] w-[200px]'>Quick Links</h1>
                    <div className="links flex flex-col gap-4 ">
                        <Link href={'#heroSection'} className='hover:text-white transition-colors'> <i className='fa-solid fa-arrow-right mr-2'></i> Home</Link>
                        <Link href={'#aboutSection'} className='hover:text-white transition-colors'> <i className='fa-solid fa-arrow-right mr-2'></i> About</Link>
                        <Link href={'#skillsSection'} className='hover:text-white transition-colors'> <i className='fa-solid fa-arrow-right mr-2'></i> Skills</Link>
                        <Link href={'#currentProjectSection'} className='hover:text-white transition-colors'> <i className='fa-solid fa-arrow-right mr-2'></i> Current Project</Link>
                        <Link href={'#MainProjectsSection'} className='hover:text-white transition-colors'> <i className='fa-solid fa-arrow-right mr-2'></i> Main Projects</Link>
                        <Link href={'#FeedbackSection'} className='hover:text-white transition-colors'> <i className='fa-solid fa-arrow-right mr-2'></i> Feedback</Link>
                    </div>
                </div>

                {/* col-3 */}
                <div className="col3 flex flex-col gap-4">
                    <h1 className='text-[22px]'>Contact Me</h1>
                    <div className="form flex flex-col gap-4 w-[250px]">
                        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-4 items-center md:items-start'>
                            <input type="text" {...register('name', { required: true })} placeholder='Your Name' className='p-1 px-2 text-black rounded-sm w-full' />
                            <input type="text" {...register('email', { required: true })} placeholder='Email' className='p-1 px-2 text-black rounded-sm w-full' />
                            <input type="text" {...register('phone', { required: true })} placeholder='Phone Number' className='p-1 px-2 text-black rounded-sm w-full' />
                            <textarea {...register('message', { required: true })} placeholder='Your Message' className='p-1 px-2 text-black rounded-sm w-full resize-none' />
                            <input type="submit" value={sendBtn} className='bg-[var(--primaryColor)] text-white px-2 py-1 cursor-pointer rounded-sm' />
                            {modal &&
                                <PrimaryModal text={`Hello ${userInputs && userInputs.name}!  Your message has been sent successfully`} setModal={setModal} />
                            }
                        </form>
                    </div>
                </div>
            </div>



            {/* lower row */}
            <div className="lowerRow border-t border-[#303030] py-8 ">
                <p className='text-center'> <i className="fa-regular fa-copyright"></i> {currentYear} - Muhammad Ali</p>
            </div>

        </div>
    )
}

export default Footer