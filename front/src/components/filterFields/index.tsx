import { useAdverts } from "@/hooks/advertHook"

interface FilterFieldProps {
    name: "Marca" | "Modelo" | "Cor" | "Ano" | "Combustível"
    list?: string[] | number[]
}

export const FilterField = ({ name, list }: FilterFieldProps) => {

    const { retrieveAdvert } = useAdverts()

    const fields = {
        Marca: "brand",
        Modelo: "model",
        Cor: "color",
        Ano: "year",
        Combustível: "fuel"
    }

    return (
        <div className="mt-10 mb-10">
            <h2 className="text-lg font-semibold text-[#000000]">{name}</h2>
            <ul className="pl-2.5 mt-2.5">
                {list!.map((e) => {
                    return (
                        <>
                            <li key={e}>
                                <p className="text-sm font-medium text-gray-30 cursor-pointer" onClick={() => retrieveAdvert(fields[name], e)}>{e}</p>
                            </li>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}