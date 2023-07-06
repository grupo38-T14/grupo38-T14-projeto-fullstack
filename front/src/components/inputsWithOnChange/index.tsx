"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import BaseForInput from "../baseForInput";

interface iInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "url" | "number" | "date" | "password";
  placeholder?: string;
  label: string;
  register?: UseFormRegisterReturn;
  error?: string;
  handle?: (e: string) => void;
  valueInput?: string | number;
}

const InputWithOnChange = ({
  type,
  label,
  placeholder,
  register,
  error,
  valueInput,
  handle,
  ...rest
}: iInputProps) => {
  return (
    <>
      <BaseForInput label={label} error={error} key={label}>
        <input
          type={type}
          id={label}
          placeholder={placeholder}
          value={valueInput && valueInput}
          defaultValue={valueInput && valueInput}
          {...register}
          onChange={handle && ((e) => handle(e.target.value))}
          className="
                input-base
                input-placeholder
                reset-appearence
                "
          {...rest}
        />
      </BaseForInput>
    </>
  );
};

export default InputWithOnChange;
