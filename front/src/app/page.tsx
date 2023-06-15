import Adverts from "@/components/adverts";
import { listRetrieveAdvertsType } from "@/schemas/advert.schema";
import { api } from "@/service";
import Image from "next/image";
import bgImage from "../../public/bg-home.png";

const getFiltersAdverts = async () => {
	const request = await api.get("adverts/all");
	const response: listRetrieveAdvertsType = request.data;

	const brands: string[] = [];
	const models: string[] = [];
	const colors: string[] = [];
	const years: number[] = [];
	const fuels: string[] = [];
	response.map((advert) => {
		if (!brands.includes(advert.brand)) {
			brands.push(advert.brand);
		}
		if (!models.includes(advert.model)) {
			models.push(advert.model);
		}
		if (!colors.includes(advert.color)) {
			colors.push(advert.color);
		}
		if (!years.includes(advert.year)) {
			years.push(advert.year);
		}
		if (!fuels.includes(advert.fuel)) {
			fuels.push(advert.fuel);
		}
	});

	brands.sort();
	models.sort();
	colors.sort();
	years.sort();
	fuels.sort();

	const newData = {
		brands: brands,
		models: models,
		colors: colors,
		years: years,
		fuels: fuels,
	};

	return newData;
};

export default async function Home() {
	const filtersAdverts = await getFiltersAdverts();
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
			<Adverts filtersAdverts={filtersAdverts} />
		</main>
	);
}
