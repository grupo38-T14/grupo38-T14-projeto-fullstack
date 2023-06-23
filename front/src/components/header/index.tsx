"use client";
import { useAuth } from "@/hooks/authHook";
import motors_logo from "../../assets/motors_shop_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/userHook";
import Modal from "../Modal";
import FormEditUser from "../forms/formEditUser";
import ModalDeleteUser from "../Modal/modalDeleteUser";
import { FormEditAddress } from "../forms/formEditAddress";

export default function Header() {
  const [menuDrop, setmenuDrop] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { cookieToken, user, getInitials, logOut } = useUser();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEditAddress, setModalEditAddress] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { setOldPath } = useAuth();
  const path = usePathname();

  const menuDropButton = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 sm:hidden`;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }
      if (!ref.current.contains(event.target as HTMLElement)) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener(
      "keydown",
      (event) => event.key == "Escape" && setOpenMenu(false)
    );

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <header className="h-20 pl-5 pr-5 relative flex justify-between items-center bg-white border-b-2 border-b-gray-50">
      {modalEdit && (
        <Modal setOpenModal={setModalEdit}>
          <FormEditUser
            setOpenModal={setModalEdit}
            setModalDeleteOpen={setModalDelete}
          />
        </Modal>
      )}

      {modalDelete && (
        <Modal setOpenModal={setModalDelete}>
          <ModalDeleteUser setOpenModal={setModalDelete} />
        </Modal>
      )}

      {modalEditAddress && (
        <Modal setOpenModal={setModalEditAddress}>
          <FormEditAddress setOpenModal={setModalEditAddress} />
        </Modal>
      )}

      <figure>
        <Image src={motors_logo} alt="motors shop logo" width={150} />
      </figure>

      <button
        className="h-12 w-8 flex flex-col justify-center items-center group sm:hidden"
        onClick={() => setmenuDrop(!menuDrop)}
      >
        <div
          className={`${menuDropButton} ${
            menuDrop
              ? "rotate-45 translate-y-3 opacity-100 group-hover:opacity-50"
              : "opacity-100 group-hover:opacity-50"
          }`}
        />
        <div
          className={`${menuDropButton} ${
            menuDrop ? "opacity-0" : "opacity-100 group-hover:opacity-50"
          }`}
        />
        <div
          className={`${menuDropButton} ${
            menuDrop
              ? "-rotate-45 -translate-y-3 opacity-100 group-hover:opacity-50"
              : "opacity-100 group-hover:opacity-50"
          }`}
        />
      </button>

      <span
        className={`${!menuDrop && "hidden"}
                w-full h-40 
                absolute bottom-[-10rem] left-0 
                flex flex-col items-center justify-around 
                bg-white text-gray-0 font-semibold
                sm:w-64 sm:h-full sm:static
                sm:flex sm:flex-row sm:justify-center sm:gap-4 sm:border-l-2
                z-10
                `}
      >
        {cookieToken && user ? (
          <div className="flex flex-col sm:items-center">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span className="rounded-full bg-brand-1 text-white text-sm flex items-center justify-center w-[32px] h-[32px]">
                {getInitials(user.name)}
              </span>

              <span className="text-base font-normal">{user.name}</span>
            </div>
            <div
              className={`sm:${
                !openMenu && "hidden"
              } sm:max-w-[200px] text-base font-normal text-gray-20 sm:absolute top-14 z-10 bg-white mt-2 sm:p-6 flex flex-col gap-4 rounded sm:shadow-inner`}
            >
              <p
                onClick={() => {
                  setModalEdit(true);
                  setOpenMenu(!openMenu);
                }}
                className="cursor-pointer"
              >
                Editar Perfil
              </p>
              <p
                onClick={() => {
                  setModalEditAddress(true);
                  setOpenMenu(!openMenu);
                }}
                className="cursor-pointer"
              >
                Editar endereço
              </p>
              {user.account_type ? <p>Meus anúncios</p> : null}
              <p
                onClick={() => {
                  logOut();
                  setOpenMenu(!openMenu);
                }}
                className="cursor-pointer"
              >
                Sair
              </p>
            </div>
          </div>
        ) : (
          <>
            {path == "/login" && (
              <Link href={"/"} onClick={() => setOldPath(path)}>
                Voltar
              </Link>
            )}
            {path != "/login" && (
              <Link
                onClick={() => setOldPath(path)}
                href="/login"
                className="
                    pl-4 text-gray-20 self-start duration-300
                    hover:text-brand-1
                    sm:pl-0 sm:self-auto"
              >
                Fazer Login
              </Link>
            )}
            {path != "/register" && (
              <Link
                onClick={() => setOldPath(path)}
                href="/register"
                className="
                    max-sm:w-11/12 pt-2 pb-2 
                    border-2 border-gray-30 
                    rounded-md text-center duration-300
                    hover:border-brand-1 hover:text-brand-1
                    sm:w-24
                    "
              >
                Cadastrar
              </Link>
            )}
            {path == "/register" && (
              <Link
                onClick={() => setOldPath(path)}
                href="/"
                className="
                    max-sm:w-11/12 pt-2 pb-2 
                    border-2 border-gray-30 
                    rounded-md text-center duration-300
                    hover:border-brand-1 hover:text-brand-1
                    sm:w-24
                    "
              >
                Voltar
              </Link>
            )}
          </>
        )}
      </span>
    </header>
  );
}
