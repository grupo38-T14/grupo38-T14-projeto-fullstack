import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import BaseForInput from "../baseForInput";
import MaskedInput from "react-input-mask";

interface iInputForMaskedProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "cpf" | "phone" | "coin";
  placeholder?: string;
  label: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

const InputForMasked = ({
  label,
  type,
  placeholder,
  register,
  error,
  ...rest
}: iInputForMaskedProps) => {
  const masked = {
    cpf: "999.999.999.99",
    phone: "(99) 99999-9999",
    coin: "R$ 999999,99",
  };

  return (
    <BaseForInput label={label} error={error} key={label}>
      <MaskedInput
        mask={
          type == "cpf"
            ? masked["cpf"]
            : type == "phone"
            ? masked["phone"]
            : masked["coin"]
        }
        type="text"
        placeholder={placeholder}
        {...register}
        className="
                input-base
                input-placeholder
                reset-appearence
                "
        {...rest}
      />
    </BaseForInput>
  );
};

export default InputForMasked;
