import { useAdverts } from "@/hooks/advertHook"

interface FilterFieldProps {
    name: "Quilometragem" | "Preço"
}

export const FilterInputField = ({ name }: FilterFieldProps) => {

    const { setMinKm, setMaxKm, setMinPrice, setMaxPrice } = useAdverts()

    const fieldsSets = {
        Quilometragem: [
            setMinKm,
            setMaxKm,
        ],
        Preço: [
            setMinPrice,
            setMaxPrice,
        ]
    }

    return (
        <div className="mb-10">
                <h2 className="text-lg font-semibold text-[#000000]">{name}</h2>
                <div className="flex pl-2.5 mt-2.5 gap-2">
                    <input className="text-sm font-semibold text-[#000000]" onChange={(e) => fieldsSets[name][0](Number(e.target.value))} type="number" placeholder="Mínimo" />
                    <input className="text-sm font-semibold text-[#000000]" onChange={(e) => fieldsSets[name][1](Number(e.target.value))} type="number" placeholder="Máximo" />
                </div>
            </div>
    )
}

//estilização input