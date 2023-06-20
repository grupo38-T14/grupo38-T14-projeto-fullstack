"use client";

import Image from "next/image";
import Button from "../button";
import { useState } from "react";
import Modal from "../Modal";
import FormCreateAdverts from "../forms/formCreateAdverts";
import { retrieveUser } from "@/schemas/user.schema";

interface UserIdProps {
	hidden: boolean;
	profileUser: retrieveUser | undefined;
}

export default function UserProfile({ hidden, profileUser }: UserIdProps) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<section className="flex flex-col bg-white w-[75%] mx-auto my-10 items-start gap-6 p-10">
				{profileUser?.avatar_url ? (
					<Image
						src={profileUser?.avatar_url}
						alt="avatar do usuário"
						width={104}
						height={104}
					/>
				) : (
					<div className="flex items-center justify-center w-24 h-24 bg-random-1 text-white rounded-full text-5xl">
						{profileUser?.name[0].toUpperCase()}
					</div>
				)}
				<div className="flex flex-col items-start gap-2.5 md:flex-row lg:flex-row md:items-center lg:items-center">
					<p className="text-xl font-semibold">{profileUser?.name}</p>
					<p className="text-smfont-medium p-2 text-brand-1 bg-brand-4 rounded">
						{profileUser?.account_type ? "Anunciante" : "Comprador"}
					</p>
				</div>
				<p className="text-base font-normal">{profileUser?.description}</p>
				{!hidden && (
					<div className="w-30%">
						<Button
							size={1}
							type="outlineBrand1"
							handle={() => setOpenModal(true)}
						>
							Criar anúncio
						</Button>
					</div>
				)}
			</section>
			{openModal && (
				<Modal setOpenModal={setOpenModal}>
					<FormCreateAdverts setOpenModal={setOpenModal} />
				</Modal>
			)}
		</>
	);
}
