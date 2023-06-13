"use client"

import React, { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/button";
import FormLogin from "@/components/forms/formLogin";
import FormCreateAdverts from "@/components/forms/formCreateAdverts";

export default function Login() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <section className="flex flex-col gap-6 h-fit w-full lg:w-[25.75rem] p-8 rounded shadow bg-gray-100">
        <h5 className="mb-2">Login</h5>
        <FormLogin/>
        <span className="body-2 text-gray-20 text-center">
          Ainda não possui conta?
        </span>
        <Button type="outline1" link href="/register">
          Cadastrar
        </Button>
      </section>
      <Button type="outlineBrand1" handle={() => setOpenModal(true)}>Criar anuncio</Button>
      {openModal && <Modal setOpenModal={setOpenModal}><FormCreateAdverts setOpenModal={setOpenModal}/></Modal>}
    </main>
  );
}
