import React from "react";

interface iBaseForInputProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const BaseForInput = ({ label, error, children }: iBaseForInputProps) => {
  return (
    <fieldset className="relative flex flex-col gap-2">
      <label htmlFor={label} className="input-label">
        {label}
      </label>
      <>{children}</>
      {error && (
        <span className="absolute -bottom-4 text-xs text-feedback-alert1">
          {error}
        </span>
      )}
    </fieldset>
  );
};

export default BaseForInput;
