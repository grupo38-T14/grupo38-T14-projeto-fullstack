"use client";

import Image from "next/image";
import motors_white_logo from "../../assets/motors_shop_white_logo.svg";
import { RiArrowUpSLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="w-full pt-10 pb-10 flex flex-col items-center justify-between gap-15 bg-gray-0 md:flex-row md:justify-around">
      <figure>
        <Image
          src={motors_white_logo}
          alt="motors shop white logo"
          width={150}
        />
      </figure>
      <p className="text-sm text-gray-100">
        © 2022 - Todos os direitos reservados.
      </p>
      <button
        title="Ir para cima"
        type="button"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        className="p-4 rounded bg-gray-10"
      >
        <RiArrowUpSLine className="text-lg" color="#FFFFFF" />
      </button>
    </footer>
  );
}
