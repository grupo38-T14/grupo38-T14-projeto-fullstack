"use client";
import { useRouter } from "next/navigation";
import { Pagination } from "../pagination";
import { useAdverts } from "@/hooks/advertHook";
import Button from "../button";
import AdvertCard from "../advertCard";

interface AdvertsListProps {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdvertsList({ hidden, setHidden }: AdvertsListProps) {
  const router = useRouter();
  const { currentAdverts, loading, retrieveAdvert } = useAdverts();

  const formatNumber = (number: number) => {
    const nForString = number.toString();
    const newNumber = `${nForString.slice(
      0,
      nForString.length - 2
    )}.${nForString.slice(nForString.length - 2)}`;

    return newNumber;
  };

  if (loading) {
    return (
      <section
        className={`flex flex-col h-full gap-10 w-full lg:w-[85%] lg:gap-12 mt-20 lg:m-0 lg:p-16 px-3 mb-14 ${
          !hidden && "hidden"
        } lg:flex`}
      >
        <div className="h-[500px] flex justify-center items-center">
          <p className="text-2xl lg:text-5xl font-medium text-gray-30">
            Carregando anúncios...
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={`flex flex-col h-full gap-10 w-full lg:w-[85%] lg:gap-12 mt-20 lg:m-0 lg:p-16 px-3 mb-14 ${
          !hidden && "hidden"
        } lg:flex`}
      >
        {currentAdverts.length > 0 && (
          <>
            <ul className="flex overflow-x-auto lg:overflow-hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 list-none gap-12 w-full">
              {currentAdverts?.map((advert) => (
                <AdvertCard advert={advert} key={advert.id} />
              ))}
            </ul>
            <div className="w-[75%] self-center lg:hidden">
              <Button type="brand" handle={() => setHidden(false)}>
                Filtros
              </Button>
            </div>
            <Pagination />
          </>
        )}
        {currentAdverts.length <= 0 && (
          <div className="h-[500px] flex justify-center items-center">
            <p className="text-2xl lg:text-5xl font-medium text-gray-30">
              Não há nenhum anúncio...
            </p>
          </div>
        )}
      </section>
    );
  }
}
