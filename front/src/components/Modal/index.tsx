import React, { SetStateAction, useEffect, useRef } from "react";

interface ModalProps {
  setOpenModal?: React.Dispatch<SetStateAction<boolean>>;
  setOpenUpdateModal?: React.Dispatch<SetStateAction<boolean>>;
  setOpenDeleteModal?: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({
  setOpenModal,
  setOpenUpdateModal,
  setOpenDeleteModal,
  children,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }
      if (!ref.current.contains(event.target as HTMLElement)) {
        setOpenModal && setOpenModal(false);
        setOpenUpdateModal && setOpenUpdateModal(false);
        setOpenDeleteModal && setOpenDeleteModal(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", (event) => {
      if (setOpenModal) {
        event.key == "Escape" && setOpenModal(false);
      }
      if (setOpenUpdateModal) {
        event.key == "Escape" && setOpenUpdateModal(false);
      }
      if (setOpenDeleteModal) {
        event.key == "Escape" && setOpenDeleteModal(false);
      }
    });

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [setOpenDeleteModal, setOpenModal, setOpenUpdateModal]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen bg-opacity-1 flex justify-center items-center p-1 py-2 lg:p-10 overflow-hidden">
      <div
        ref={ref}
        className=" animate-modal relative flex flex-col justify-center items-center W-[95%] max-h-[96%] h-fit lg:w-fit px-6 py-5 bg-white rounded-md shadow-md overflow-hidden"
      >
        <button
          className="absolute top-2 right-3 font-bold text-lg"
          onClick={() => {
            if (setOpenModal) {
              setOpenModal(false);
            }
            if (setOpenUpdateModal) {
              setOpenUpdateModal(false);
            }
            if (setOpenDeleteModal) {
              setOpenDeleteModal(false);
            }
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
