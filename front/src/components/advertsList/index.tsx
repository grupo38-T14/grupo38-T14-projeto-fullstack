//import Image from "next/image"

export default function AdvertsList() {
    //Importar via contexto a lista de adverts atualizada
    //Dessa lista, fazer um map criando cada <li>
    //Inserir função onClick em cada li para direcionar para a página do anúncio
    return (
        <section>
            <ul className="grid grid-cols-3 list-none gap-12 w-full">
                {
                    return (
                        <li className="flex flex-col items-start gap-4 border-none cursor-pointer">
                            <div className="flex w-full">
                                <img className="flex w-full" src="" alt="imagem do carro" />
                            </div>
                            <section className="flex flex-col items-center justify-start gap-4 w-full">
                                <h2 className="text-base font-semibold"></h2>
                                <p className="text-sm font-normal"></p>
                                <div className="flex items-center justify-start gap-y-2 w-full">
                                    <img className="h-8 w-8" src="" alt="imagem do perfil do anunciante" />
                                    <p className="text-base font-medium"></p>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center justify-between w-5/12 gap-3">
                                        <p className="text-base font-medium"></p>
                                        <p className="text-base font-medium"></p>
                                    </div>
                                    <p className="text-base font-medium"></p>
                                </div>
                            </section>
                            <img src="" alt="ícone de preço bom - ícone verde" />
                        </li>
                    )
                }
            </ul>
        </section>
    )
}