"use client";

import Image from "next/image";
import Button from "../button";
import { useAuth } from "@/hooks/authHook";

export default function UserProfile() {
	const { loggedUser } = useAuth();
	return (
		<section className="flex flex-col bg-white w-[75%] mx-auto my-10 items-start gap-6 p-10">
			{loggedUser?.avatar_url ? (
				<Image
					src={loggedUser?.avatar_url}
					alt="avatar do usuário"
					width={104}
					height={104}
				/>
			) : (
				<div className="flex items-center justify-center w-24 h-24 bg-random-1 text-white rounded-full text-5xl">
					{loggedUser?.name[0].toUpperCase()}
				</div>
			)}
			<div className="flex flex-col items-start gap-2.5 md:flex-row lg:flex-row md:items-center lg:items-center">
				<p className="text-xl font-semibold">{loggedUser?.name}</p>
				<p className="text-smfont-medium p-2 text-brand-1 bg-brand-4 rounded">
					{loggedUser?.account_type ? "Anunciante" : "Comprador"}
				</p>
			</div>
			<p className="text-base font-normal">{loggedUser?.description}</p>
			<div className="w-30%">
				<Button size={1} type="outlineBrand1">
					Criar anúncio
				</Button>
			</div>
		</section>
	);
}
