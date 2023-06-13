"use client"

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
    }
}

export default function AdvertsFilter({list}: AdvertsFilterProps) {

    const { retrieveAdvert, page, setMinKm, setMaxKm, setMinPrice, setMaxPrice } = useAdverts();

    return (
        <section className="flex flex-col w-[15%] py-16 px-4">
            <FilterField name={"Marca"} list={list.brands}/>
            <FilterField name={"Modelo"} list={list.models} />
            <FilterField name={"Cor"} list={list.colors} />
            <FilterField name={"Ano"} list={list.years} />
            <FilterField name={"Combustível"} list={list.fuels} />
            <FilterInputField name={"Quilometragem"} type="KM"/>
            <FilterInputField name={"Preço"} type="Price"/>
            {(page?.filter || page?.filterMax || page?.filterMin)  && <Button type="brand" handle={() => {retrieveAdvert("", "", 1); setMinKm(0); setMaxKm(10000000); setMinPrice(0); setMaxPrice(10000000)}}>Limpar Filtros</Button>}
        </section>

    )
}