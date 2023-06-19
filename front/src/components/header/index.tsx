"use client";

import { useAuth } from "@/hooks/authHook";
import motors_logo from "../../assets/motors_shop_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/hooks/userHook";
import Button from "../button";
import Modal from "../Modal";
import FormEditUser from "../forms/formEditUser";

export default function Header() {
  const [menuDrop, setmenuDrop] = useState(false);
  const { cookieToken, user, getInitials } = useUser();
  const [modalEdit, setModalEdit] = useState(false);

  const { setOldPath } = useAuth();
  const path = usePathname();

  const menuDropButton = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300 sm:hidden`;

  return (
    <header className="h-20 pl-5 pr-5 relative flex justify-between items-center bg-white border-b-2 border-b-gray-50">
      {modalEdit && (
        <Modal setOpenModal={setModalEdit}>
          <FormEditUser setOpenModal={setModalEdit}></FormEditUser>
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
                `}
      >
        {cookieToken && user ? (
          <p className="flex gap-2 items-center">
            <span className="rounded-full bg-brand-1 text-white text-sm flex items-center justify-center w-[32px] h-[32px]">
              {getInitials(user.name)}
            </span>

            {user.name}
          </p>
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
        <Button type={"outlineBrand1"} handle={() => setModalEdit(true)}>
          Editar Perfil
        </Button>
      </span>
    </header>
  );
}
/*
<span 
    className="max-sm:hidden w-1/3 h-full flex justify-around items-center border-l-2 border-l-gray-50 text-black font-semibold"
>
    <Link href="/login">Fazer Login</Link>
    <Link href="/register">Cadastrar</Link>
</span>


*/
