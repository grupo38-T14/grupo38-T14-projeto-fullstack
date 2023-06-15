import RegisterForm from "@/components/forms/formRegister";
import React from "react";

export default function page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-4">
			<section className="flex flex-col gap-6 h-fit w-full lg:w-[25.75rem] p-8 rounded shadow bg-gray-100 my-11">
				<h5 className="mb-2 text-2xl font-medium text-black">Cadastro</h5>
				<RegisterForm />
			</section>
		</main>
	);
}
