import { useAdverts } from "@/hooks/advertHook";
import Input from "../inputs";
import Button from "../button";

export default function AdvertsFilter() {

    //Função para filtrar km e preço

    const { brands, models, colors, years, fuels, retrieveAdvert, page } = useAdverts();

    return (
        <section className="flex flex-col w-[20%] py-16 px-4">
            <div className="mt-10 mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Marca</h2>
                <ul className="pl-2.5 mt-2.5">
                    {brands.map((e) => {
                        return (
                            <>
                                <li key={e}>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {retrieveAdvert("brand", e)}}>{e}</p>
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
                                <li key={e}>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {retrieveAdvert("model", e)}}>{e}</p>
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
                                <li key={e}>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {retrieveAdvert("color", e)}}>{e}</p>
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
                                <li key={e}>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {retrieveAdvert("year", String(e))}}>{e}</p>
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
                                <li key={e}>
                                    <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => {retrieveAdvert("fuel", e)}}>{e}</p>
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
            {page?.filter && <Button type="brand" handle={() => {retrieveAdvert("", "", 1)}}>Limpar Filtros</Button>}
        </section>
    )
}