"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import MaskedInput from "react-input-mask";

interface iInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type:
		| "text"
		| "email"
		| "url"
		| "number"
		| "date"
		| "cpf"
		| "phone"
		| "coin"
		| "password";
	placeholder: string;
	label: string;
	register?: UseFormRegisterReturn;
	error?: string;
	handle?: (e: string) => void;
	valueInput?: string | number;
}

const Input = ({
	type,
	label,
	placeholder,
	register,
	error,
	valueInput,
	handle,
	...rest
}: iInputProps) => {
	const maskedTypes = ["cpf", "phone", "coin"];
	const masked = {
		cpf: "999.999.999.99",
		phone: "(99) 99999-9999",
		coin: "R$ 999999,99",
	};

	return (
		<>
			<fieldset className="relative flex flex-col gap-2">
				<label htmlFor={label} className="input-label">
					{label}
				</label>
				<>
					{!maskedTypes.includes(type) ? (
						<input
							type={type}
							id={label}
							placeholder={placeholder}
							{...register}
							value={valueInput && valueInput}
							onChange={handle && ((e) => handle(e.target.value))}
							className="
                input-base
                input-placeholder
                reset-appearence
                "
							{...rest}
						/>
					) : (
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
							value={valueInput && valueInput}
							className="
                input-base
                input-placeholder
                reset-appearence
                "
						/>
					)}
				</>
				{error && (
					<span className="absolute -bottom-4 text-xs text-feedback-alert1">
						{error}
					</span>
				)}
			</fieldset>
		</>
	);
};

export default Input;
