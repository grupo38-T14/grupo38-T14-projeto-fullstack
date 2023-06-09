import { useAdverts } from "@/hooks/advertHook";
import Input from "../inputs";
import Button from "../button";
import { useForm } from "react-hook-form";

export default function AdvertsFilter() {

    //Função para filtrar km e preço
    //Lógica para caso os anúncios sejam excluídos, os filtros sumirem

    const { brands, models, colors, years, fuels, setFilterAdverts, filterAdverts, filterByKmOrPrice } = useAdverts();

    return (
        <section className="flex flex-col w-[20%] py-16 px-4">
            <div className="mt-10 mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Marca</h2>
                <ul className="pl-2.5 mt-2.5">
                    {brands.map((e) => {
                        return (
                            <>
                                <li>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {setFilterAdverts(e)}}>{e}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Modelo</h2>
                <ul className="pl-2.5 mt-2.5">
                    {models.map((e) => {
                        return (
                            <>
                                <li>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {setFilterAdverts(e)}}>{e}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Cor</h2>
                <ul className="pl-2.5 mt-2.5">
                    {colors.map((e) => {
                        return (
                            <>
                                <li>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {setFilterAdverts(e)}}>{e}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Ano</h2>
                <ul className="pl-2.5 mt-2.5">
                    {years.map((e) => {
                        return (
                            <>
                                <li>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {setFilterAdverts(e)}}>{e}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Combustível</h2>
                <ul className="pl-2.5 mt-2.5">
                    {fuels.map((e) => {
                        return (
                            <>
                                <li>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {setFilterAdverts(e)}}>{e}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Km</h2>
                <div className="flex pl-2.5 mt-2.5 gap-2">
                    <Input label="Km" type="number" placeholder="Mínimo" />
                    <Input label="Km" type="number" placeholder="Máximo" />
                </div>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Preço</h2>
                <div className="flex pl-2.5 mt-2.5 gap-2">
                    <Input label="Preço" type="coin" placeholder="Mínimo" />
                    <Input label="Preço" type="coin" placeholder="Máximo" />
                </div>
            </div>
            {filterAdverts && <Button type="brand" handle={() => {setFilterAdverts("")}}>Limpar Filtros</Button>}
        </section>
    )
}