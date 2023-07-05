import React from "react";
import { toast, Slide, ToastOptions } from "react-toastify";

interface NotifyProps {
  type: "success" | "error" | "logout";
  message: string;
}

const configBase: ToastOptions = {
  position: "bottom-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

const Notify = ({ type, message }: NotifyProps) => {
  switch (type) {
    case "success":
      return toast.success(message, configBase);
    case "error":
      return toast.error(message, configBase);
    case "logout":
      return toast.info(message, configBase);
  }
};

export default Notify;
