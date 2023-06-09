"use client"

import React, { useState } from 'react'
import { UseFormRegisterReturn } from "react-hook-form";

interface iSelectProps {
    label: string;
    /* quando for utilizar deve ser tirado a interrogação */
    register?: UseFormRegisterReturn
    error?: string
  }

const Select = ({label, register, error}: iSelectProps) => {

    const [selectValue, setSelectValue] = useState(0)

  return (
    <fieldset className="relative flex flex-col gap-2 pb-6">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
        <select
          id={label}
          {...register}
          value={selectValue}
          onChange={(e) => setSelectValue(+e.target.value)}
          className="
            w-full
            h-[3rem]
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
        >
            <option value="0" disabled>selecione uma opção</option>
            <option value="1">gasolina</option>
            <option value="2">híbrido </option>
            <option value="3">óleo</option>
        </select>
        {error && <span className="absolute bottom-0 text-xs text-feedback-alert1">{error}</span>}
    </fieldset>
  )
}

export default Select