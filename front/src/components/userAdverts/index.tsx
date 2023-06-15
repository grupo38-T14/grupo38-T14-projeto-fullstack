"use client";

import { useAuth } from "@/hooks/authHook";
import Image from "next/image";
import Button from "../button";
import { useRouter } from "next/navigation";
import { listRetrieveAdvertsType } from "@/schemas/advert.schema";

interface UserAdvertsProps {
	userAdverts: listRetrieveAdvertsType;
}

export const UserAdverts = ({ userAdverts }: UserAdvertsProps) => {
	//paginação
	//testar requisições
	const router = useRouter();
	const { loading } = useAuth();

	return (
		<section
			className={`flex flex-col h-full gap-10 w-full lg:w-full lg:gap-12 mt-20 lg:m-0 lg:p-16 px-3 mb-14 lg:flex`}
		>
			{loading && (
				<div className="h-[500px] flex justify-center items-center">
					<p className="text-2xl lg:text-5xl font-medium text-gray-30">
						Carregando anúncios...
					</p>
				</div>
			)}
			<ul className="flex overflow-x-auto lg:overflow-hidden lg:grid lg:grid-cols-4 list-none gap-12 w-full">
				<>
					{userAdverts.map((advert) => {
						<li
							key={advert.id}
							className="relative flex flex-col min-w-[300px] lg:w-fit items-start gap-6 cursor-pointer border-none rounded shadow-lg p-4 bg-white brightness-95 hover:brightness-100 transition-all ease-in-out duration-500"
						>
							<div>
								<div className="flex w-[100%] items-center overflow-hidden p-5 rounded">
									<Image
										className="flex m-auto object-fill rounded"
										src={advert.image_cape}
										width={250}
										height={250}
										alt="imagem do carro"
									/>
								</div>
							</div>
							<section className="flex flex-col items-start justify-start gap-4 w-full">
								<h2 className="text-base font-semibold text-gray-10">
									{advert.brand} - {advert.model}
								</h2>
								<p className="text-sm font-normal text-gray-20 w-[240px] text-ellipsis overflow-hidden">
									{advert.description}
								</p>
								<div className="flex items-center justify-between w-full border-t-2 border-solid border-gray-50 pt-4 gap-10">
									<p className="text-sm lg:text-base font-medium text-gray-10">
										{advert.price?.toLocaleString("pt-BR", {
											style: "currency",
											currency: "BRL",
										})}
									</p>
									<div className="flex items-start gap-2">
										<p className="text-xs lg:text-sm font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">
											{advert.km} KM
										</p>
										<p className="text-xs lg:text-sm font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">
											{advert.year}
										</p>
									</div>
								</div>
							</section>
							<div className="w-[65%] flex gap-3">
								<Button size={2} type="outline1">
									Editar
								</Button>
								<Button
									size={2}
									type="outline1"
									handle={() => router.push(`/${advert.id}`)}
								>
									Ver Detalhes
								</Button>
							</div>
							{advert.is_active ? (
								<p className="absolute left-5 top-5 bg-brand-1 text-white text-sm font-medium px-2 py-1 rounded">
									Ativo
								</p>
							) : (
								<p className="absolute left-5 top-5 text-white text-sm font-medium px-2 py-1 rounded bg-gray-40">
									Inativo
								</p>
							)}
						</li>;
					})}
				</>
			</ul>
			{userAdverts.length <= 0 && (
				<div className="h-[500px] flex justify-center items-center">
					<p className="text-2xl lg:text-5xl font-medium text-gray-30">
						Você não possui nenhum anúncio ainda...
					</p>
				</div>
			)}
		</section>
	);
};
