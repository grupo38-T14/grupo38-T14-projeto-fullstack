import { useAdverts } from "@/hooks/advertHook";

export const Pagination = () => {

    const { page, retrieveAdvert } = useAdverts();

    return (
        <div className="flex w-full mb-16 gap-8 justify-center items-center">
            {page?.prev && <p onClick={() => {retrieveAdvert(page?.filter, page?.filterName, page?.prev)}} className="text-lg font-semibold text-brand-2 cursor-pointer">{`<`} Anterior</p>}
            <p className="text-lg font-semibold text-gray-30">página {page?.current} de {page?.last}</p>
            {page?.next && <p onClick={() => {retrieveAdvert(page?.filter, page?.filterName, page?.next)}} className="text-lg font-semibold text-brand-2 cursor-pointer">Seguinte {`>`}</p>}
        </div>
    )
}