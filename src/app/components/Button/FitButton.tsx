import React from 'react'

const FitButton = ({text}:{text:string}) => {
  return (
    <div className='w-fit rounded-sm px-2 py-1 bg-[var(--primaryColor)] cursor-pointer'>{text}</div>
  )
}

export default FitButton