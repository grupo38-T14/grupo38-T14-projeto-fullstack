"use client";

import Image from "next/image";
import Button from "../button";
import { useAuth } from "@/hooks/authHook";
import { retrieveUser } from "@/schemas/user.schema";

interface UserProps {
	user: retrieveUser | undefined;
}

export default function UserProfile({ user }: UserProps) {
	/* const { loggedUser } = useAuth(); */
	return (
		<section className="flex flex-col bg-white w-[75%] mx-auto my-10 items-start gap-6 p-10">
			{user?.avatar_url ? (
				<Image
					src={user?.avatar_url}
					alt="avatar do usuário"
					width={104}
					height={104}
				/>
			) : (
				<div className="flex items-center justify-center w-24 h-24 bg-random-1 text-white rounded-full text-5xl">
					{user?.name[0].toUpperCase()}
				</div>
			)}
			<div className="flex flex-col items-start gap-2.5 md:flex-row lg:flex-row md:items-center lg:items-center">
				<p className="text-xl font-semibold">{user?.name}</p>
				<p className="text-smfont-medium p-2 text-brand-1 bg-brand-4 rounded">
					{user?.account_type ? "Anunciante" : "Comprador"}
				</p>
			</div>
			<p className="text-base font-normal">{user?.description}</p>
			<div className="w-30%">
				<Button size={1} type="outlineBrand1">
					Criar anúncio
				</Button>
			</div>
		</section>
	);
}
