"use client";
import Button from "@/components/button";
import { retrieveAdvertType } from "@/schemas/advert.schema";
import { api } from "@/service";
import Image from "next/image";
import TextArea from "@/components/textArea";
import { useUser } from "@/hooks/userHook";

interface IPageProps {
  params: { id: string };
}

export const revalidate = 30;

const Advert = async ({ params }: IPageProps) => {
  const { getInitials } = useUser();
  const advert: retrieveAdvertType = await api
    .get(`adverts/${params.id}`)
    .then((res) => res.data);

  return (
    <main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile md:bg-gradient">
      <section className="flex flex-col gap-4 w-full items-center">
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start lg:justify-center ">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="max-w-[752px] w-full max-h-[355px] h-full bg-white flex flex-col gap-4 items-center justify-center rounded">
              <Image
                src={advert.image_cape!}
                alt={`Imagem do carro ${advert.model}`}
                width={290}
                height={250}
                className="max-w-[441px] w-[250px] md:w-full py-8 md:py-14"
              />
            </div>

            <div className="max-w-[752px] w-full bg-white p-7 rounded">
              <div className=" flex flex-col gap-9">
                <h6 className="text-gray-10">{advert.model}</h6>
                <div className="flex flex-col md:flex-row md:justify-between gap-9 ">
                  <div className="flex gap-3 ">
                    <p className="text-xs lg:text-sm font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">
                      {advert.year}
                    </p>
                    <p className="text-xs lg:text-sm font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">
                      {advert.km} KM
                    </p>
                  </div>
                  <p className="h7 text-gray-10">R$ {advert.price},00</p>
                </div>

                <button className='bg-brand-1 hover:bg-brand-2 text-white border-brand-1 hover:border-brand-2 h-9 text-md" button-base w-24 px-5'>
                  Comprar
                </button>
              </div>
            </div>
            <div className="max-w-[752px] w-full bg-white p-7 rounded">
              <h6 className="text-gray-10 pb-8">Descrição</h6>
              <p className="body-1 text-gray-20">{advert.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-12 md:gap-8 ">
            <div className=" min-h-[377px] max-w-[440px] w-full bg-white p-8 rounded">
              <h6 className="text-gray-10">Fotos</h6>
              <div className="flex flex-wrap gap-[5.5px] sm:gap-4 mt-8 justify-center">
                {advert.gallery?.map((pic) => (
                  <div
                    key={pic.id}
                    className="w-[90px] sm:w-[108px] h-[90px] sm:h-[108px] bg-gray-70 flex items-center justify-center"
                  >
                    <Image
                      key={pic.id}
                      src={pic.image_url}
                      alt={`Imagem do anúncio ${pic.advertId}`}
                      width={90}
                      height={90}
                      className=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col max-w-[440px] w-full gap-7 items-center bg-white p-8 rounded">
              {advert.user.avatar_url ? (
                <Image
                  key={advert.user.id}
                  src={advert.user.avatar_url}
                  alt={`Imagem do anúncio ${advert.user.id}`}
                  width={77}
                  height={77}
                  className="rounded-full"
                />
              ) : (
                <p className="rounded-full bg-brand-1 text-white text-xl md:text-3xl flex items-center justify-center w-[77px] h-[77px] md:h-[104px] md:w-[104px]">
                  {getInitials(advert.user.name)}
                </p>
              )}
              <h6 className="text-gray-0">{advert.user.name}</h6>

              <p className="text-gray-20 text-justify md:text-center">
                {advert.user.description.slice(0, 130)}...
              </p>

              <Button type="grey0">Ver todos anúncios</Button>
            </div>
          </div>
        </div>
        <div className="max-w-[752px] w-full py-9 pl-7 pr-10 h-full bg-white flex flex-col gap-4 justify-center rounded lg:relative lg:left-[-123px] xl:left-[-227px]">
          <h6 className="text-gray-10 pb-6">Comentários</h6>
          <div className="flex flex-col gap-11">
            {/* {advert.comments?.map((comment) => ( */}
            <div className="flex flex-col gap-4 ">
              <header className="flex gap-2 items-center">
                <p className="rounded-full bg-brand-1 text-white text-sm flex items-center justify-center w-[32px] h-[32px]">
                  JL
                </p>

                <p className="text-gray-10 body-2 font-medium">Julia Lima</p>
                <div className="w-1 h-1 rounded-full bg-gray-40" />
                <p className="text-gray-40 text-xs font-inter">há 3 dias</p>
              </header>
              <p className="body-2 text-gray-20 input-label">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="flex flex-col gap-4 ">
              <header className="flex gap-2 items-center">
                <p className="rounded-full bg-brand-1 text-white text-sm flex items-center justify-center w-[32px] h-[32px]">
                  MA
                </p>

                <p className="text-gray-10 body-2 font-medium">
                  Marcos Antônio
                </p>
                <div className="w-1 h-1 rounded-full bg-gray-40" />
                <p className="text-gray-40 text-xs font-inter">há 7 dias</p>
              </header>
              <p className="body-2 text-gray-20 input-label">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="flex flex-col gap-4 ">
              <header className="flex gap-2 items-center">
                <p className="rounded-full bg-brand-1 text-white text-sm flex items-center justify-center w-[32px] h-[32px]">
                  CS
                </p>

                <p className="text-gray-10 body-2 font-medium">Camila Silva</p>
                <div className="w-1 h-1 rounded-full bg-gray-40" />
                <p className="text-gray-40 text-xs font-inter">há 1 mês</p>
              </header>
              <p className="body-2 text-gray-20 input-label">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            {/* ))} */}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 max-w-[752px] w-full bg-white py-9 px-8 mb-11 rounded lg:relative lg:left-[-123px] xl:left-[-227px]">
        <header className="flex gap-2 items-center">
          <p className="rounded-full bg-brand-1 text-white text-sm flex items-center justify-center w-[32px] h-[32px]">
            JL
          </p>
          <p className="text-gray-10 body-2 font-medium">Julia Lima</p>
        </header>
        <div className="md:relative">
          <textarea
            placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
            className="  
            body-1
            w-full
            h-32
            px-4
            py-2
            border-2 
            border-gray-70 
            hover:border-gray-80 
            rounded 
            input-placeholder
            outline-none
            focus:border-brand-1
            focus:text-brand-1
            resize-none
            mb-6
            md:mb-0
            
          "
          />
          <button className='mb-6 bg-brand-1 hover:bg-brand-2 text-white border-brand-1 hover:border-brand-2 h-[38px] text-md" button-base w-24 px-5 md:absolute right-3 bottom-0'>
            Comentar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <p className="bg-gray-70 rounded-3xl h-6 w-fit px-3 flex items-center text-[12px] font-medium text-gray-30">
            Gostei muito!
          </p>
          <p className="bg-gray-70 rounded-3xl h-6 w-fit px-3 flex items-center text-[12px] font-medium text-gray-30">
            Incrível
          </p>
          <p className="bg-gray-70 rounded-3xl h-6 w-fit px-3 flex items-center text-[12px] font-medium text-gray-30">
            Recomendarei para meus amigos
          </p>
        </div>
      </section>
    </main>
  );
};

export default Advert;
