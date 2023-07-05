import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import BaseForInput from "../baseForInput";
import { mask, unMask } from "remask";

interface iInputForMaskedProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	type: "cpf" | "phone";
	placeholder?: string;
	label: string;
	register?: UseFormRegisterReturn;
	error?: string;
	disabled?: boolean;
	value?: string;
}

const InputForMasked = ({
	label,
	type,
	placeholder,
	register,
	error,
	disabled,
	value,
}: iInputForMaskedProps) => {
	const maskedArray = {
		cpf: ["999.999.999-99", "99.999.999/9999-99"],
		phone: ["(99) 99999-9999"],
	};

	const [inputValue, setInputValue] = useState<string>();

	const handleValeuInput = (e: React.FormEvent<HTMLInputElement>) => {
		setInputValue(mask(unMask(e.currentTarget.value), maskedArray[type]));
	};

	return (
		<BaseForInput label={label} error={error} key={label}>
			<input
				type="text"
				name={label}
				id={label}
				placeholder={placeholder}
				{...register}
				value={inputValue}
				onChange={handleValeuInput}
				disabled={disabled}
				className="input-base input-placeholder reset-appearence"
			/>
		</BaseForInput>
	);
};

export default InputForMasked;
