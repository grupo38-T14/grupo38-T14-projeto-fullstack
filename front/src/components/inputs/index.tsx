"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import BaseForInput from "../baseForInput";

interface iInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type: "text" | "email" | "url" | "number" | "date" | "password";
	placeholder: string;
	label: string;
	register?: UseFormRegisterReturn;
	error?: string;
}

const Input = ({
	type,
	label,
	placeholder,
	register,
	error,
	...rest
}: iInputProps) => {
	return (
		<>
			<BaseForInput label={label} error={error} key={label}>
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
					{...rest}
				/>
			</BaseForInput>
		</>
	);
};

export default Input;
