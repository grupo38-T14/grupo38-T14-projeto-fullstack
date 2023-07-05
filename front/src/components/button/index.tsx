import Link from "next/link";
import React from "react";

interface iButtonProps {
  children: React.ReactNode;
  handle?: (e: any) => void;
  size?: 1 | 2;
  type:
    | "brand"
    | "grey0"
    | "success"
    | "alert"
    | "disableBland"
    | "disable"
    | "outlineBrand1"
    | "outline1"
    | "outline2"
    | "outlineLight"
    | "negative"
    | "light"
    | "grey6";
  disable?: boolean;
  submit?: boolean;
  href?: string;
  link?: boolean;
  target?: "_blank" | "_self";
}

const Button = ({
  children,
  handle,
  size = 1,
  type,
  disable = false,
  submit,
  href,
  link,
  target,
}: iButtonProps) => {
  const sizeVariants = ["h-[3rem] text-md", "h-[2.375rem] text-sm"];

  const buttonVariant = {
    brand:
      "bg-brand-1 hover:bg-brand-2 text-white border-brand-1 hover:border-brand-2",
    grey0:
      "bg-gray-0 hover:bg-gray-10 text-white border-gray-0 hover:border-gray-10",
    success:
      "bg-feedback-success3 hover:bg-feedback-success2 text-feedback-success1 border-feedback-success3 hover:border-feedback-success2",
    alert:
      "bg-feedback-alert3 hover:bg-feedback-alert2 text-feedback-alert1 border-feedback-alert3 hover:border-feedback-alert2",
    outlineBrand1: "bg-white hover:bg-brand-4 border-brand-1 text-brand-1",
    outline1:
      "bg-white hover:bg-gray-10 border-gray-40 hover:border-gray-10 text-gray-0 hover:text-white",
    outline2:
      "bg-white hover:bg-gray-10 border-gray-10 hover:border-gray-10 text-gray-0 hover:text-white",
    outlineLight:
      "bg-transparent hover:bg-gray-100 border-gray-100 text-gray-100 hover:text-gray-10",
    disableBland: "bg-brand-3 text-white border-brand-3",
    disable: "bg-gray-50 text-white border-gray-50",
    negative:
      "bg-gray-60 hover:bg-gray-50 text-gray-20 border-gray-60 hover:border-gray-50",
    light: "bg-gray-100 border-gray-100 text-gray-10",
    grey6: "bg-gray-60 border-gray-60 text-gray-20",
  };

  return (
    <>
      {!link && (
        <button
          title={`${children}`}
          onClick={handle}
          disabled={disable}
          type={submit ? "submit" : "button"}
          className={`
        button-base
        ${sizeVariants[size - 1]} 
        ${size == 1 ? "px-7" : "px-5"} 
        ${buttonVariant[type]}
        ${disable && "cursor-not-allowed"}
        transition-colors
        ease-in-out
        duration-400
        `}
        >
          {children}
        </button>
      )}
      {link && (
        <Link
          href={href!}
          target={target}
          className={`
        button-base
        ${sizeVariants[size - 1]} 
        ${size == 1 ? "px-7" : "px-5"} 
        ${buttonVariant[type]}
        ${disable && "cursor-not-allowed"}
        transition-colors
        ease-in-out
        duration-400
        `}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
