"use client";

import FormCreateNewPassword from "@/components/forms/formCreateNewPassword";
import { NextPage } from "next";
import { useParams } from "next/navigation";

const RecoverPassword: NextPage = () => {
  const { token } = useParams();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <section className="flex flex-col gap-6 h-fit w-full lg:w-[25.75rem] p-8 rounded shadow bg-gray-100">
        <h5 className="mb-2">Crie sua senha</h5>
        <FormCreateNewPassword token={token as string} />
      </section>
    </main>
  );
};
export default RecoverPassword;
