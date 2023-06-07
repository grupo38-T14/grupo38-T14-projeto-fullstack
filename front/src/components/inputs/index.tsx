import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import MaskedInput from "react-input-mask";

interface iInputProps {
  type: "text" | "email" | "url" | "number" | "date" | "cpf" | "phone" | "coin" ;
  placeholder: string;
  label: string;
  /* quando for utilizar deve ser tirado a interrogação */
  register?: UseFormRegisterReturn
  error?: string
}

const Input = ({ type, label, placeholder, register, error}: iInputProps) => {
  const maskedTypes = ["date", "cpf", "phone", "coin"];
  const masked = {
    date: "99/99/9999",
    cpf: "999.999.999.99",
    phone: "(99) 99999-9999",
    coin: "R$ 999999,99"
  }

  return (
    <fieldset className="relative flex flex-col gap-2 pb-6">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
      {!maskedTypes.includes(type) && (
        <input
          type={type}
          id={label}
          placeholder={placeholder}
          {...register}
          className="
            w-full
            h-[3rem] 
            bg-[#f6f6f6] 
            hover:bg-gray-80 
            px-4 
            border-2 
            border-gray-70 
            hover:border-gray-80 
            rounded 
            input-placeholder
            outline-none
            focus:border-brand-1
            focus:text-brand-1
            appearance-none
            reset-appearence
            "
        />
      )}
      {maskedTypes.includes(type) && <MaskedInput 
          mask={type == "cpf" ? masked["cpf"] : type == "phone" ? masked["phone"] : type == "coin" ? masked["coin"] : masked["date"]}
          placeholder={placeholder}
          {...register}
          className="
          w-full
          h-[3rem] 
          bg-[#f6f6f6] 
          hover:bg-gray-80 
          px-4 
          border-2 
          border-gray-70 
          hover:border-gray-80 
          rounded 
          input-placeholder
          outline-none
          focus:border-brand-1
          focus:text-brand-1
          "
        />}
        {error && <span className="absolute bottom-0 text-xs text-feedback-alert1">{error}</span>}
    </fieldset>
  );
};

export default Input;
