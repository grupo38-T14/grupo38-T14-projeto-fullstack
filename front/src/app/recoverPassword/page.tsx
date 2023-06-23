"use client";

import FormCreateNewPassword from "@/components/forms/formCreateNewPassword";

export default function RecoverPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <section className="flex flex-col gap-6 h-fit w-full lg:w-[25.75rem] p-8 rounded shadow bg-gray-100">
        <h5 className="mb-2">Crie sua senha</h5>
        <FormCreateNewPassword />
      </section>
    </main>
  );
}
