"use client";

import Adverts from "@/components/adverts";
import Image from "next/image";
import bgImage from "../../public/bg-home.png";

export default async function Home() {
	return (
		<main className="flex flex-col lg:justify-between w-full h-fit bg-gray-90 overflow-hidden">
			<div className="w-full h-[18.75rem] lg:h-[34rem] relative">
				<Image
					src={bgImage}
					alt="image background"
					className="w-full h-full object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-[18.75rem] lg:h-[34rem] flex flex-col pt-52 lg:pt-40 items-center">
					<h1 className="text-white text-base lg:text-4.5xl">Motors Shop</h1>
					<h1 className="text-white text-base lg:text-4.5xl text-center">
						A melhor plataforma de anúncios de carros do país
					</h1>
				</div>
			</div>
			<Adverts />
		</main>
	);
}
