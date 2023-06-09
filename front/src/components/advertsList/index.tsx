import Image from "next/image"
import { useAdverts } from "@/hooks/advertHook";
import { useRouter } from "next/navigation";
import Section_2 from "../../../public/Section 2.png"
import { Pagination } from "../pagination";

export default function AdvertsList() {

    //Ver paginação

    const router = useRouter();
    const { adverts, filterAdverts, allAdverts } = useAdverts();

    const filteredAdverts = allAdverts?.filter((e) => filterAdverts === e.brand || filterAdverts === e.color || filterAdverts === e.model || filterAdverts === e.year || filterAdverts === e.fuel)

    if(adverts.length > 0){
        if(!filterAdverts){
            return (
                <section className="w-[80%]">
                    <ul className="grid grid-cols-3 list-none gap-12 w-full p-16">
                        {adverts?.map((advert) => {
                            return (
                                <>
                                <li className="relative flex flex-col items-start gap-4 border-none cursor-pointer" key={advert.id} onClick={() => router.push(`/dashboard/${advert.id}`)}>
                                    <div className="flex w-[100%] items-center overflow-hidden">
                                        <Image className="flex m-auto object-cover pt-2.5" src={advert.image_cape} width={250} height={250} alt="imagem do carro" />
                                    </div>
                                    <section className="flex flex-col items-start justify-start gap-4 w-full">
                                        <h2 className="text-base font-semibold text-gray-10">{advert.brand} - {advert.model}</h2>
                                        <p className="text-sm font-normal text-gray-20">{advert.description}</p>
                                        <div className="flex items-center justify-start gap-y-2 gap-x-2 w-full">
                                            <div className="flex items-center justify-center w-8 h-8 bg-random-1 text-white rounded-full">
                                                R
                                            </div>
                                            <p className="text-sm font-normal text-gray-20">Rafael</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-start w-5/12 gap-3">
                                                <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4">{advert.km} KM</p>
                                                <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4">{advert.year}</p>
                                            </div>
                                            <p className="text-base font-medium text-gray-10">R$ {advert.price}.00</p>
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
                <section className="w-[80%]">
                    <ul className="grid grid-cols-3 list-none gap-12 w-full p-16">
                    {filteredAdverts?.map((advert) => {
                            return (
                                <>
                                <li className="relative flex flex-col items-start gap-4 border-none cursor-pointer" key={advert.id} onClick={() => router.push(`/dashboard/${advert.id}`)}>
                                <div className="flex w-[100%] items-center overflow-hidden">
                                        <Image className="flex m-auto object-cover pt-2.5" src={advert.image_cape} width={250} height={250} alt="imagem do carro" />
                                    </div>
                                    <section className="flex flex-col items-start justify-start gap-4 w-full">
                                        <h2 className="text-base font-semibold text-gray-10">{advert.brand} - {advert.model}</h2>
                                        <p className="text-sm font-normal text-gray-20">{advert.description}</p>
                                        <div className="flex items-center justify-start gap-y-2 gap-x-2 w-full">
                                            <div className="flex items-center justify-center w-8 h-8 bg-random-1 text-white rounded-full">
                                                R
                                            </div>
                                            <p className="text-sm font-normal text-gray-20">Rafael</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-start w-5/12 gap-3">
                                                <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4">{advert.km} KM</p>
                                                <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4">{advert.year}</p>
                                            </div>
                                            <p className="text-base font-medium text-gray-10">R$ {advert.price}.00</p>
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
        }
    }else{
        return (
            <section className="flex w-full m-auto items-start justify-center">
              <p className="text-5xl font-medium text-gray-30">Não há nenhum anúncio :(</p>
            </section>
          )
    }
}