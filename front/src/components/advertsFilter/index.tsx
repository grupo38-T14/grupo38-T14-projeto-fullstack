"use client";

import { useAdverts } from "@/hooks/advertHook";
import Button from "../button";
import { FilterField } from "../filterFields";
import { FilterInputField } from "../filterInputFields";
import { useState } from "react";

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
	const [filterSelected, setFilterSelected] = useState<string | number | null>(null)

	return (
		<section
			className={`flex flex-col gap-10 lg:w-[21%] py-16 px-4 ${
				hidden && "hidden"
			} lg:flex`}
		>
			<div>
				<FilterField name={"Marca"} list={list.brands} filterSelected={filterSelected} setFilterSelected={setFilterSelected}/>
				<FilterField name={"Modelo"} list={list.models} filterSelected={filterSelected} setFilterSelected={setFilterSelected}/>
				<FilterField name={"Cor"} list={list.colors} filterSelected={filterSelected} setFilterSelected={setFilterSelected}/>
				<FilterField name={"Ano"} list={list.years} filterSelected={filterSelected} setFilterSelected={setFilterSelected}/>
				<FilterField name={"Combustível"} list={list.fuels} filterSelected={filterSelected} setFilterSelected={setFilterSelected}/>
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
						setFilterSelected(null)
					}}
				>
					Limpar Filtros
				</Button>
			)}
		</section>
	);
}
