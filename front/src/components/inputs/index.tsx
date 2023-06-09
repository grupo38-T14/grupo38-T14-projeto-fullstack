import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import MaskedInput from "react-input-mask";

interface iInputProps {
  type: "text" | "email" | "url" | "number" | "date" | "cpf" | "phone" | "coin" ;
  placeholder: string;
  label: string;
  register?: UseFormRegisterReturn
  error?: string
  handle?: () => void;
}

const Input = ({ type, label, placeholder, register, error}: iInputProps) => {
  const maskedTypes = ["cpf", "phone", "coin"];
  const masked = {
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
            input-base
            input-placeholder
            reset-appearence
            "
        />
      )}
      {maskedTypes.includes(type) && <MaskedInput 
          mask={type == "cpf" ? masked["cpf"] : type == "phone" ? masked["phone"] : masked["coin"] }
          type={type == "date" ? "date" : "text"}
          placeholder={placeholder}
          {...register}
          className="
          input-base
          input-placeholder
          reset-appearence
          "
        />}
        {error && <span className="absolute bottom-0 text-xs text-feedback-alert1">{error}</span>}
    </fieldset>
  );
};

export default Input;
