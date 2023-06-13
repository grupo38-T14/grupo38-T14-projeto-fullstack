import { useAdverts } from "@/hooks/advertHook"

interface FilterFieldProps {
    name: "Quilometragem" | "Preço",
    type: "KM" | "Price"
}

export const FilterInputField = ({ name, type }: FilterFieldProps) => {

    const { setMinKm, setMaxKm, setMinPrice, setMaxPrice, retrieveFilterByKmPriceAdvert } = useAdverts()

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
        <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#000000]">{name}</h2>
                <div className="flex flex-col pl-2.5 mt-2.5 gap-2">
                    <input className="text-sm font-semibold text-[#000000] border-2 border-solid border-gray-50 w-[75%] rounded pl-2" onChange={(e) => (fieldsSets[name][0](Number(e.target.value)), retrieveFilterByKmPriceAdvert(type))} type="number" placeholder="Mínimo" />
                    <input className="text-sm font-semibold text-[#000000] border-2 border-solid border-gray-50 w-[75%] rounded pl-2" onChange={(e) => (fieldsSets[name][1](Number(e.target.value)), retrieveFilterByKmPriceAdvert(type))} type="number" placeholder="Máximo" />
                </div>
            </div>
    )
}

//estilização input