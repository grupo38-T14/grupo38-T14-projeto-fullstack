"use client";

import Button from "@/components/button";
import { retrieveAdvertType } from "@/schemas/advert.schema";
import { api } from "@/service";
import Image from "next/image";
import { useUser } from "@/hooks/userHook";
import { useAdverts } from "@/hooks/advertHook";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageProfile from "@/components/imageProfile";
import CommentCard from "@/components/commentCard";

const Advert = () => {
  const params = useParams();
  const [advert, setAdvert] = useState<retrieveAdvertType>(
    {} as retrieveAdvertType
  );
  const [commentCurrent, setCommentCurrent] = useState<string>("");

  const { pageProfile, user } = useUser();
  const { createComment } = useAdverts();

  useEffect(() => {
    (async () => {
      const { data } = await api.get<retrieveAdvertType>(
        `adverts/${params.id}`
      );
      setAdvert(data);
    })();
  }, [params.id]);

  const tags = ["Gostei muito!", "Incrível", "Recomendarei para meus amigos"];

  return (
    <main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile md:bg-gradient">
      <section className="flex flex-col gap-4 w-full items-center">
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start lg:justify-center ">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="max-w-[752px] w-full max-h-[355px] h-full bg-white flex flex-col gap-4 items-center justify-center rounded">
              {advert.image_cape && (
                <Image
                  src={advert.image_cape!}
                  alt={`Imagem do carro ${advert.model}`}
                  width={290}
                  height={250}
                  className="max-w-[441px] w-[250px] md:w-full py-8 md:py-14"
                />
              )}
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
                <div className="w-28">
                  {user ? (
                    <Button type="brand" size={2}>
                      Comprar
                    </Button>
                  ) : (
                    <Button type="disableBland" size={2} disable>
                      Comprar
                    </Button>
                  )}
                </div>
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
                {advert.gallery && advert.gallery.length > 0 ? (
                  advert.gallery?.map((pic) => (
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
                  ))
                ) : (
                  <h4>Este anúncio não possui imagens da galeria</h4>
                )}
              </div>
            </div>
            <div className="flex flex-col max-w-[440px] w-full gap-7 items-center bg-white p-8 rounded">
              <ImageProfile userProfile={advert.user && advert.user} size={1} />
              <h6 className="text-gray-0">{advert.user && advert.user.name}</h6>
              <p className="text-gray-20 text-justify md:text-center">
                {advert.user && advert.user.description?.slice(0, 130)}...
              </p>

              <Button type="grey0" handle={() => pageProfile(advert)}>
                Ver todos anúncios
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-[752px] w-full py-9 pl-7 pr-10 h-full bg-white flex flex-col gap-4 justify-center rounded lg:relative lg:left-[-123px] xl:left-[-227px]">
          <h6 className="text-gray-10 pb-6">Comentários</h6>
          <div className="flex flex-col gap-11">
            {advert.comments && advert.comments.length > 0 ? (
              advert.comments?.map((comment, index) => (
                <>
                  <CommentCard comment={comment} key={index} />
                </>
              ))
            ) : (
              <p className="body-2 text-gray-20 input-label">
                Este anúncio ainda não possui comentários
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 max-w-[752px] w-full bg-white py-9 px-8 mb-11 rounded lg:relative lg:left-[-123px] xl:left-[-227px]">
        <header className="flex gap-2 items-center">
          <ImageProfile userProfile={user && user} size={2} />
          <p className="text-gray-10 body-2 font-medium">{user && user.name}</p>
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
            onChange={(e) => setCommentCurrent(e.target.value)}
            value={commentCurrent}
          />
          <div className="mb-6 h-[38px] w-24 md:absolute right-6 bottom-0">
            {user ? (
              <Button
                type="brand"
                handle={() => (
                  setCommentCurrent(""),
                  createComment(commentCurrent, advert.id, setAdvert)
                )}
                size={2}
              >
                Comentar
              </Button>
            ) : (
              <Button type="disableBland" size={2} disable>
                Comentar
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <p
              className="bg-gray-70 rounded-3xl h-6 w-fit px-3 flex items-center text-[12px] font-medium text-gray-30 cursor-pointer"
              key={index}
              onClick={() => setCommentCurrent(`${commentCurrent} ${tag}`)}
            >
              {tag}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Advert;
