import React from 'react'
import { UseFormRegisterReturn } from "react-hook-form";

interface iTextAreaProps {
    placeholder: string;
    label: string;
    /* quando for utilizar deve ser tirado a interrogação */
    register?: UseFormRegisterReturn
    error?: string
  }

const TextArea = ({label, placeholder, register, error}: iTextAreaProps) => {
  return (
    <fieldset className="relative flex flex-col gap-2">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
        <textarea
          id={label}
          placeholder={placeholder}
          {...register}
          className="
            w-full
            h-20
            bg-[#f6f6f6] 
            hover:bg-gray-80 
            px-4
            py-2
            border-2 
            border-gray-70 
            hover:border-gray-80 
            rounded 
            input-placeholder
            outline-none
            focus:border-brand-1
            focus:text-brand-1
            resize-none
            "
        />
        {error && <span className="absolute bottom-0 text-xs text-feedback-alert1">{error}</span>}
    </fieldset>
  )
}

export default TextArea