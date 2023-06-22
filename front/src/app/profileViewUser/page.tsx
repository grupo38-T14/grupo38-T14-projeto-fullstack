"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAdverts } from "@/hooks/advertHook";

const ProfilePage = () => {
	//Como pegar o id do anunciante procurado? Salvar no LocalStorage ou Cookies?
	//Precisa mudar algo na navegação - código do Diego?
	//Botão de editar anúncio
	//estilização (background - color brand)
	const router = useRouter();
	const { getProfileAdverts, profileUserAdverts, profileUser } = useAdverts();

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile">
			<>
				<section className="flex flex-col bg-white w-[75%] mx-auto my-10 items-start gap-6 p-10">
					{profileUser!.avatar_url ? (
						<Image
							src={profileUser!.avatar_url}
							alt="avatar do usuário"
							width={104}
							height={104}
						/>
					) : (
						<div className="flex items-center justify-center w-24 h-24 bg-random-1 text-white rounded-full text-5xl">
							{profileUser!.name && profileUser!.name[0].toUpperCase()}
						</div>
					)}
					<div className="flex flex-col items-start gap-2.5 md:flex-row lg:flex-row md:items-center lg:items-center">
						<p className="text-xl font-semibold">{profileUser!.name}</p>
						<p className="text-smfont-medium p-2 text-brand-1 bg-brand-4 rounded">
							{profileUser!.account_type ? "Anunciante" : "Comprador"}
						</p>
					</div>
					<p className="text-base font-normal">{profileUser!.description}</p>
				</section>
				<section
					className={`flex flex-col h-full gap-10 w-full lg:w-full lg:gap-12 mt-20 lg:m-0 lg:p-16 px-3 mb-14 lg:flex`}
				>
					{profileUserAdverts && profileUserAdverts!.data?.length > 0 && (
						<>
							<ul className="flex overflow-x-auto lg:overflow-hidden lg:grid lg:grid-cols-4 list-none gap-16 w-full">
								<>
									{profileUserAdverts!.data.map((advert) => {
										return (
											<li
												key={advert.id}
												className="relative flex flex-col min-w-[500px] lg:w-fit lg:m-auto items-start gap-6 border-none rounded shadow-lg p-4 bg-white brightness-95 hover:brightness-100 transition-all ease-in-out duration-500"
											>
												<div className="w-full">
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
											</li>
										);
									})}
								</>
							</ul>
							<div className="flex flex-col lg:flex-row w-full gap-8 justify-center items-center">
								{profileUserAdverts!.prev && (
									<p
										onClick={() => {
											getProfileAdverts(
												"0b1d9e1d-89c3-4137-a15f-fd7ce78bb3a6",
												profileUserAdverts!.prev
											),
												scrollToTop();
										}}
										className="text-lg font-semibold text-brand-2 cursor-pointer"
									>
										{`<`} Anterior
									</p>
								)}
								<p className="text-lg font-semibold text-gray-30">
									página {profileUserAdverts!.currentPage} de{" "}
									{profileUserAdverts!.lastPage}
								</p>
								{profileUserAdverts!.next && (
									<p
										onClick={() => {
											getProfileAdverts(
												"0b1d9e1d-89c3-4137-a15f-fd7ce78bb3a6",
												profileUserAdverts!.next
											),
												scrollToTop();
										}}
										className="text-lg font-semibold text-brand-2 cursor-pointer"
									>
										Seguinte {`>`}
									</p>
								)}
							</div>
						</>
					)}
					{profileUserAdverts && profileUserAdverts!.data?.length <= 0 && (
						<div className="h-[500px] flex justify-center items-center">
							<p className="text-2xl lg:text-5xl font-medium text-gray-30">
								Você não possui nenhum anúncio ainda...
							</p>
						</div>
					)}
				</section>
			</>
		</main>
	);
};

export default ProfilePage;
