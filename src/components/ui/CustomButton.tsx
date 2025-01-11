'use client'

import { CustomButtonType } from "../lib/customs/customTypes"

export default function CustomButton({title, additionalStyles, handleClick, disabled, value} : CustomButtonType) {
  return (
    <button 
    onClick={handleClick}
    disabled={disabled}
    value={value}
    className={`${additionalStyles} px-5 py-2.5 rounded-2xl flex-1 text-lg font-medium outline-none`}>
    {title}
    </button>
  )
}
