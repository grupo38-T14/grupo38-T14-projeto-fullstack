"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";
import Section_2 from "../../../public/Section 2.png"
import { Pagination } from "../pagination";
import { useAdverts } from "@/hooks/advertHook";


export default function AdvertsList() {

    const router = useRouter();
    const { currentAdverts, loading } = useAdverts()

    if(loading){
        return(
            <section className="flex w-full m-auto items-start justify-center">
                <p className="text-5xl font-medium text-gray-30">Carregando anúncios...</p>
            </section>
        )
    }else{
        if(currentAdverts.length > 0){
            return (
                <section className="flex flex-col w-[85%] gap-16 p-16 relative">
                    <ul className="grid grid-cols-3 list-none gap-12 w-full">
                        {currentAdverts?.map((advert) => {
                            return (
                                <>
                                <li key={advert.id} className="relative flex flex-col items-start gap-4 cursor-pointer border-none shadow-lg p-4" onClick={() => router.push(`/dashboard/${advert.id}`)}>
                                    <div className="flex w-[100%] items-center overflow-hidden bg-gray-50 p-5 rounded">
                                        <Image className="flex m-auto object-fill rounded" src={advert.image_cape} width={250} height={250} alt="imagem do carro" />
                                    </div>
                                    <section className="flex flex-col items-start justify-start gap-4 w-full">
                                        <h2 className="text-base font-semibold text-gray-10">{advert.brand} - {advert.model}</h2>
                                        <p className="text-sm font-normal text-gray-20">{advert.description}</p>
                                        <div className="flex items-center justify-start gap-y-2 gap-x-2 w-full border-t-2 border-solid border-gray-50 pt-4">
                                            <div className="flex items-center justify-center w-8 h-8 bg-random-1 text-white rounded-full">
                                                {advert.user?.name[0].toUpperCase()}
                                            </div>
                                            <p className="text-sm font-normal text-gray-20">{advert.user?.name}</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full border-t-2 border-solid border-gray-50 pt-4">
                                        <p className="text-lg font-medium text-gray-10">R$ {advert.price}.00</p>
                                            <div className="flex items-start gap-2">
                                                <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">{advert.km} KM</p>
                                                <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">{advert.year}</p>
                                            </div>
                                        </div>
                                    </section>
                                    {advert.price <= (0.95 * advert.table_fipe_price) ? <Image className="flex absolute top-0 right-0" src={Section_2} alt="ícone de preço bom - ícone verde" /> : undefined}
                                </li>
                                </>
                            )
                        })
                        }
                    </ul>
                    <Pagination />
                </section>
            )
        }else{
            return (
                <section className="flex w-full m-auto items-start justify-center">
                  <p className="text-5xl font-medium text-gray-30">Não há nenhum anúncio :(</p>
                </section>
              )
        }
    }
}