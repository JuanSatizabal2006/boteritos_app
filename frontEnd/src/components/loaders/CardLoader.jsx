import React from 'react'
import { ElementLoader } from './ElementLoader.jsx'

export const CardLoader = ({title, text}) => {
  return (
    <div>
        <ElementLoader/>
        <p className='text-title2 font-cocogooseSemiLight text-darkBlue'>{title}</p>
        <p className='text-paragraph font-cocogooseLight text-black'>{text}</p>
    </div>
  )
}