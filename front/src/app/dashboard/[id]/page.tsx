import { api } from "@/service";
import Link from "next/link";

interface IPageProps {
  params: { id: string };
}

export const revalidate = 30;

const Advert = async ({ params }: IPageProps) => {
  const advert = await api.get(`adverts/${params.id}`).then((res) => res.data);

  return (
    <main className="body min-h-screen">
      <Link className="btn-primary m-6" href={"/dashboard"}>
        Voltar
      </Link>
      <div className="flex items-center justify-center">
        <h1>{advert ? advert.model : "carregando..."}</h1>
      </div>
    </main>
  );
};

export default Advert;
