import React, { Dispatch, SetStateAction } from 'react'

interface PrimaryModalProps {
    text :string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PrimaryModal: React.FC<PrimaryModalProps> = ({ text,setModal }) => {
    return (
        <div className="modalContainer w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className='PrimaryModal w-[400px] h-[200px] bg-white text-black rounded-lg flex flex-col justify-center items-center gap-8 '>
                <p>{text}</p>
                <button className='bg-[var(--primaryColor)] p-2 px-3 rounded-md self-right text-white' onClick={()=>setModal(false)}>Ok</button>
            </div>
        </div>
    )
}

export default PrimaryModal