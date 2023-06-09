import { useAdverts } from "@/hooks/advertHook";

export const Pagination = () => {

    const { page, retrieveAdvert } = useAdverts();

    if(!page?.prev){
        return (
            <div className="flex w-full mb-16 gap-8 justify-center items-center">
                <p className="text-lg font-semibold text-gray-30">{page?.currentPage} de {page?.lastPage}</p>
                <p onClick={() => {retrieveAdvert(page!.next)}} className="text-lg font-semibold text-brand-2 cursor-pointer">Seguinte {`>`}</p>
            </div>
        )
    }else if(!page?.next){
        return (
            <div className="flex w-full mb-16 gap-8 justify-center items-center">
                <p onClick={() => {retrieveAdvert(page!.prev)}} className="text-lg font-semibold text-brand-2 cursor-pointer">{`<`} Anterior</p>
                <p className="text-lg font-semibold text-gray-30">{page!.currentPage} de {page?.lastPage}</p>
            </div>
        )
    }else{
        return (
            <div className="flex w-full mb-16 gap-8 justify-center items-center">
                <p onClick={() => {retrieveAdvert(page!.prev)}} className="text-lg font-semibold text-brand-2 cursor-pointer">{`<`} Anterior</p>
                <p className="text-lg font-semibold text-gray-30">{page!.currentPage} de {page?.lastPage}</p>
                <p onClick={() => {retrieveAdvert(page!.next)}} className="text-lg font-semibold text-brand-2 cursor-pointer">Seguinte {`>`}</p>
            </div>
        )
    }
}