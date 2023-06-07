import Image from "next/image"
import { useAdverts } from "@/hooks/advertHook";
import { useRouter } from "next/navigation";

export default function AdvertsList() {
    //Importar via contexto a lista de adverts atualizada
    //Dessa lista, fazer um map criando cada <li>
    //Inserir função onClick em cada li para direcionar para a página do anúncio

    //Testar a criação do anúncio e ver a estilização
    //Imagens
    //ícone de produto com preço bom
    //Ver paginação

    const router = useRouter();
    const { adverts } = useAdverts();

    return (
        <section className="max-w-5x1">
            <ul className="grid grid-cols-3 list-none gap-12 w-full p-16">
                {adverts?.map((advert) => {
                    return (
                        <>
                        <li className="flex flex-col items-start gap-4 border-none cursor-pointer" key={advert.id} onClick={() => router.push(`/dashboard/${advert.id}`)}>
                            <div className="flex w-full">
                                <Image className="flex w-full" src={advert.image_cape} alt="imagem do carro" />
                            </div>
                            <section className="flex flex-col items-start justify-start gap-4 w-full">
                                <h2 className="text-base font-semibold text-gray-10">{advert.brand} - {advert.model}</h2>
                                <p className="text-sm font-normal text-gray-20">{advert.description}</p>
                                <div className="flex items-center justify-start gap-y-2 w-full">
                                    <Image className="h-8 w-8" src="" alt="imagem do perfil do anunciante" />
                                    <p className="text-base font-medium text-gray-20">{advert.user?.name}</p>
                                </div>
                                <div className="flex items-start justify-between w-full">
                                    <div className="flex items-start w-5/12 gap-3">
                                        <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4">{advert.km} KM</p>
                                        <p className="text-base font-medium text-brand-1 px-2 py-1 bg-brand-4">{advert.year}</p>
                                    </div>
                                    <p className="text-base font-medium text-gray-10">R$ {advert.price},00</p>
                                </div>
                            </section>
                            <Image src="" alt="ícone de preço bom - ícone verde" />
                        </li>
                        </>
                    )
                })
                }
            </ul>
        </section>
    )
}