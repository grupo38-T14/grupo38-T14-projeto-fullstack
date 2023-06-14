import React, { SetStateAction } from "react";

interface ModalProps {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ setOpenModal, children }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen bg-opacity-1 flex justify-center p-1 py-2 lg:p-10 overflow-hidden">
      <div className="relative flex flex-col justify-center items-center w-[94%] h-fit lg:w-fit px-6 py-5 bg-white rounded-md shadow-md overflow-hidden">
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
