import { useAdverts } from "@/hooks/advertHook";
import Input from "../inputs";
import Button from "../button";

export default function AdvertsFilter() {

    //Tem que tratar os textos antes de salvar no banco de dados - Primeira letra maiúscula e combustível - exemplo também: branco e branca
    //Tamanho e posição dos inputs estão errados
    //Posição do botão de limpar filtros
    //Falta input de km - tipo de input
    //Função para filtrar km e preço

    const { brands, models, colors, years, fuels, setFilterAdverts } = useAdverts();

    return (
        <section className="flex flex-col w-2/12 py-16 px-8">
            <Button type="brand" handle={() => {setFilterAdverts("")}}>Limpar Filtros</Button>
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
                <div className="flex justify-between pl-2.5 mt-2.5">
                    <Input label="Km" type="coin" placeholder="Mínimo" />
                    <Input label="Km" type="coin" placeholder="Máximo" />
                </div>
            </div>
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">Preço</h2>
                <div className="flex justify-between pl-2.5 mt-2.5">
                    <Input label="Preço" type="coin" placeholder="Mínimo" />
                    <Input label="Preço" type="coin" placeholder="Máximo" />
                </div>
            </div>
        </section>
    )
}