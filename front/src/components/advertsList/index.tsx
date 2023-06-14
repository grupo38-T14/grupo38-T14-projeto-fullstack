'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Section_2 from '../../../public/Section 2.png';
import { Pagination } from '../pagination';
import { useAdverts } from '@/hooks/advertHook';
import Button from '../button';

interface AdvertsListProps {
	hidden: boolean;
	setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdvertsList({ hidden, setHidden }: AdvertsListProps) {
	const router = useRouter();
	const { currentAdverts, loading } = useAdverts();

	return (
		<section
			className={`flex flex-col h-full gap-10 w-full lg:w-[85%] lg:gap-12 mt-20 lg:m-0 lg:p-16 px-3 mb-14 ${
				!hidden && 'hidden'
			} lg:flex`}
		>
			{loading && (
				<div className="h-[500px] flex justify-center items-center">
					<p className="text-2xl lg:text-5xl font-medium text-gray-30">
						Carregando anúncios...
					</p>
				</div>
			)}
			{currentAdverts.length > 0 && (
				<>
					<ul className="flex overflow-x-auto lg:overflow-hidden lg:grid lg:grid-cols-3 list-none gap-12 w-full">
						{currentAdverts?.map((advert) => {
							return (
								<>
									<li
										key={advert.id}
										className="relative flex flex-col min-w-[300px] lg:w-fit items-start gap-4 cursor-pointer border-none rounded shadow-lg p-4 bg-white brightness-95 hover:brightness-100 transition-all ease-in-out duration-500"
										onClick={() => router.push(`/${advert.id}`)}
									>
										<div className="flex w-[100%] items-center overflow-hidden p-5 rounded">
											<Image
												className="flex m-auto object-fill rounded"
												src={advert.image_cape}
												width={250}
												height={250}
												alt="imagem do carro"
											/>
										</div>
										<section className="flex flex-col items-start justify-start gap-4 w-full">
											<h2 className="text-base font-semibold text-gray-10">
												{advert.brand} - {advert.model}
											</h2>
											<p className="text-sm font-normal text-gray-20 w-[240px] text-ellipsis overflow-hidden">
												{advert.description}
											</p>
											<div className="flex items-center justify-start gap-y-2 gap-x-2 w-full border-t-2 border-solid border-gray-50 pt-4">
												<div className="flex items-center justify-center w-8 h-8 bg-random-1 text-white rounded-full">
													{advert.user?.name[0].toUpperCase()}
												</div>
												<p className="text-sm font-normal text-gray-20">
													{advert.user?.name}
												</p>
											</div>
											<div className="flex items-center justify-between w-full border-t-2 border-solid border-gray-50 pt-4">
												<p className="text-sm lg:text-base font-medium text-gray-10">
													{advert.price.toLocaleString('pt-BR', {
														style: 'currency',
														currency: 'BRL',
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
										{advert.price <= 0.95 * advert.table_fipe_price ? (
											<Image
												className="flex absolute top-0 right-0"
												src={Section_2}
												alt="ícone de preço bom - ícone verde"
											/>
										) : undefined}
									</li>
								</>
							);
						})}
					</ul>
					<div className="w-[75%] self-center lg:hidden">
						<Button type="brand" handle={() => setHidden(false)}>
							Filtros
						</Button>
					</div>
					<Pagination />
				</>
			)}
			{currentAdverts.length <= 0 && (
				<div className="h-[500px] flex justify-center items-center">
					<p className="text-2xl lg:text-5xl font-medium text-gray-30">
						Não há nenhum anúncio :(
					</p>
				</div>
			)}
		</section>
	);
}
