import React from 'react'
import './DropLoader.css'

const DropLoader = () => {
    return (
        <section className="sec-loading flex flex-col gap-6">
            <div className="one">
            </div>
            <p className='text-lg text-white font-bold'>Loading . . .</p>
        </section>
    )
}

export default DropLoader