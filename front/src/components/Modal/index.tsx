import React, { SetStateAction, useEffect, useRef } from "react";

interface ModalProps {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ setOpenModal, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
        if (!ref.current) {
            return
        }

        if (!event.target) {
            return
        }
        if (!ref.current.contains(event.target as HTMLElement)) {
          setOpenModal(false)
        }
    }

    window.addEventListener("mousedown", handleClick)
    window.addEventListener(
      "keydown",
      event => event.key == "Escape"
      && setOpenModal(false))

    return () => {
        window.removeEventListener("mousedown", handleClick)
    }
}, [])

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen bg-opacity-1 flex justify-center p-1 py-2 lg:p-10 overflow-hidden">
      <div 
      ref={ref}
      className="relative flex flex-col justify-center items-center w-[94%] h-fit lg:w-fit px-6 py-5 bg-white rounded-md shadow-md overflow-hidden">
        <button
          className="absolute top-2 right-3 font-bold text-lg"
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
