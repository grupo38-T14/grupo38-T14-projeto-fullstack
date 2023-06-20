"use client";

import { useAdverts } from "@/hooks/advertHook";
import Button from "../button";
import { FilterField } from "../filterFields";
import { FilterInputField } from "../filterInputFields";

interface AdvertsFilterProps {
	list: {
		brands: string[];
		models: string[];
		colors: string[];
		years: number[];
		fuels: string[];
	};
	hidden: boolean;
	setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdvertsFilter({
	list,
	hidden,
	setHidden,
}: AdvertsFilterProps) {
	const { retrieveAdvert, page, setMinKm, setMaxKm, setMinPrice, setMaxPrice } =
		useAdverts();

	return (
		<section
			className={`flex flex-col gap-10 lg:w-[21%] py-16 px-4 ${
				hidden && "hidden"
			} lg:flex`}
		>
			<div>
				<FilterField name={"Marca"} list={list.brands} key={"Marca"} />
				<FilterField name={"Modelo"} list={list.models} key={"Modelo"} />
				<FilterField name={"Cor"} list={list.colors} key={"Cor"} />
				<FilterField name={"Ano"} list={list.years} key={"Ano"} />
				<FilterField
					name={"Combustível"}
					list={list.fuels}
					key={"Combusível"}
				/>

				<FilterInputField name={"Quilometragem"} type="KM" />
				<FilterInputField name={"Preço"} type="Price" />
			</div>
			<div className="w-full self-center lg:hidden">
				<Button type="outlineBrand1" handle={() => setHidden(true)}>
					Ver anúncios
				</Button>
			</div>
			{(page?.filter || page?.filterMax || page?.filterMin) && (
				<Button
					type="brand"
					handle={() => {
						retrieveAdvert("", "", 1);
						setMinKm(0);
						setMaxKm(1000000);
						setMinPrice(0);
						setMaxPrice(1000000);
					}}
				>
					Limpar Filtros
				</Button>
			)}
		</section>
	);
}
