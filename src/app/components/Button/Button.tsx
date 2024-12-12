import React from 'react'
import './Button.css'

export const PrimaryButton = ({text, bgColor,textColor}:{text:string, bgColor:string, textColor:string}) => {
  return (
    <div className='PrimaryButton' 
    style={{backgroundColor:bgColor, color:textColor}}
    >{text}</div>
  )
}