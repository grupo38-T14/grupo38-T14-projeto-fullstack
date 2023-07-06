import { retrieveAdvertType } from "@/schemas/advert.schema";
import Section_2 from "../../../public/Section 2.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AdvertCardProps {
  advert: retrieveAdvertType;
  cookieId?: string;
  children?: React.ReactNode;
}

const AdvertCard = ({ advert, cookieId, children }: AdvertCardProps) => {
  const router = useRouter();

  return (
    <li
      key={advert.id}
      className=" animate-show relative flex flex-col min-w-[300px] lg:w-fit items-start gap-4 cursor-pointer border-none rounded shadow-lg p-4 bg-white brightness-95 hover:brightness-100 transition-all ease-in-out duration-500"
      onClick={!cookieId ? () => router.push(`/${advert.id}`) : undefined}
    >
      <div className="flex w-[100%] items-center h-[200px] rounded">
        <Image
          className="w-[100%] rounded"
          src={advert.image_cape}
          width={250}
          height={250}
          alt="imagem do carro"
        />
      </div>
      <section className="flex flex-col items-start justify-start gap-4 w-full">
        <div className="w-[250px]">
          <h2 className="text-base font-semibold text-gray-10 truncate">
            {advert.brand} - {advert.model}
          </h2>
        </div>
        <div className="w-[240px] h-6">
          <p className="text-sm font-normal text-gray-20 truncate">
            {advert.description}
          </p>
        </div>
        <div className="flex items-center justify-start gap-y-2 gap-x-2 w-full border-t-2 border-solid border-gray-50 pt-4">
          <div className="flex items-center justify-center w-8 h-8 bg-random-1 text-white rounded-full">
            {advert.user?.name[0].toUpperCase()}
          </div>
          <p className="text-sm font-normal text-gray-20">
            {advert.user?.name}
          </p>
        </div>
        <div className="flex items-center justify-between w-full border-t-2 border-solid border-gray-50 pt-4">
          <p className="text-sm lg:text-base font-medium text-gray-10">
            {advert.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <div className="flex items-start gap-2">
            <p className="text-xs lg:text-sm font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">
              {advert.km} KM
            </p>
            <p className="text-xs lg:text-sm font-medium text-brand-1 px-2 py-1 bg-brand-4 rounded">
              {advert.year}
            </p>
          </div>
        </div>
      </section>
      {advert.price &&
      advert.table_fipe_price &&
      advert.price <= 0.95 * advert.table_fipe_price ? (
        <Image
          className="flex absolute top-0 right-0"
          src={Section_2}
          alt="ícone de preço bom - ícone verde"
        />
      ) : undefined}
      {children}
    </li>
  );
};

export default AdvertCard;
