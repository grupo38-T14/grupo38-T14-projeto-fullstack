import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import BaseForInput from "../baseForInput";
import { currency } from "remask";

interface iInputCoinProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label: string;
  register?: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
  value?: string | number;
}

const InputCoin = ({
  label,
  placeholder,
  register,
  error,
  disabled,
  value,
}: iInputCoinProps) => {
  const handleValeuInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(
      convertCoin(
        currency.unmask({
          locale: "pt-BR",
          currency: "BRL",
          value: e.currentTarget.value,
        })+""
      )
    );
  };

  const convertCoin = (value: string) => {
    const newValue = currency.mask({
      locale: "pt-BR",
      currency: "BRL",
      value: +value,
    });
    return newValue;
  };
  const [inputValue, setInputValue] = useState<string>(
    value ? convertCoin(value + "") : ""
  );

  return (
    <BaseForInput label={label} error={error} key={label}>
      <input
        type="text"
        name={label}
        id={label}
        placeholder={placeholder}
        {...register}
        value={value ? convertCoin(value + "") : inputValue}
        onChange={handleValeuInput}
        disabled={disabled}
        className="input-base input-placeholder reset-appearence"
      />
    </BaseForInput>
  );
};

export default InputCoin;
