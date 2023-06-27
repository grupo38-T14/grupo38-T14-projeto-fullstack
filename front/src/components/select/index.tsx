"use client";

import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface iSelectProps {
	label: string;
	options: string[];
	optionsValue?: string[];
	optionDefault: string;
	optionValueSelected?: string;
	register?: UseFormRegisterReturn;
	error?: string;
	handle?: (brand: string) => void;
}

const Select = ({
	label,
	optionDefault,
	optionValueSelected,
	options,
	optionsValue,
	register,
	error,
	handle,
}: iSelectProps) => {
	const [selectValue, setSelectValue] = useState(
		optionValueSelected ? optionValueSelected : ""
	);

	return (
		<fieldset className="relative flex flex-col gap-2">
			<label htmlFor={label} className="input-label">
				{label}
			</label>
			<select
				id={label}
				{...register}
				value={optionValueSelected ? optionValueSelected : selectValue}
				onChange={(e) => (
					setSelectValue(e.target.value), handle && handle(e.target.value)
				)}
				className={`px-4 py-2 input-base input-placeholder resize-none ${
					selectValue == "" && !optionValueSelected && "text-gray-40"
				}`}
			>
				<option value={""} disabled>
					{optionDefault}
				</option>
				{options.map((opt, index) => (
					<option value={optionsValue ? optionsValue[index] : opt} key={index}>
						{opt}
					</option>
				))}
			</select>
			{error && (
				<span className="absolute -bottom-4 text-xs text-feedback-alert1">
					{error}
				</span>
			)}
		</fieldset>
	);
};

export default Select;
