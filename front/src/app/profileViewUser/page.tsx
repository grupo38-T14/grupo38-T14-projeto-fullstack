"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAdverts } from "@/hooks/advertHook";
import nookies from "nookies";

const ProfilePageViewUser = () => {
  const router = useRouter();
  const {
    getProfileAdverts,
    profileUserAdverts,
    profileUser,
    loading,
    profileId,
    setProfileId,
  } = useAdverts();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cookies = nookies.get(null, "profile.id");
  setProfileId(cookies["profile.id"]);

  return (
    <main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile">
      <>
        <section className="flex flex-col bg-white w-full md:w-[80%]  items-start gap-6 p-7 rounded">
          {profileUser!.avatar_url ? (
            <Image
              src={profileUser!.avatar_url}
              alt="avatar do usuário"
              width={104}
              height={104}
              className="rounded-full w-28 h-28"
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 bg-random-1 text-white rounded-full text-5xl">
              {profileUser!.name && profileUser!.name[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-col items-start gap-2.5 md:flex-row lg:flex-row md:items-center lg:items-center">
            <p className="text-xl font-semibold">{profileUser!.name}</p>
            <p className="text-smfont-medium p-2 text-brand-1 bg-brand-4 rounded">
              {profileUser!.account_type ? "Anunciante" : "Comprador"}
            </p>
          </div>
          <p className="text-base font-normal">{profileUser!.description}</p>
        </section>
        <section
          className={`flex flex-col h-full gap-10 w-full lg:w-full lg:gap-12 mt-10 md:mt-16 lg:m-0 lg:p-16 px-3 mb-14 lg:flex`}
        >
          <h5>Anúncios</h5>
          {loading && (
            <div className="h-[500px] flex justify-center items-center">
              <p className="text-2xl lg:text-5xl font-medium text-gray-30">
                Carregando anúncios...
              </p>
            </div>
          )}
          {profileUserAdverts && profileUserAdverts!.data?.length > 0 && (
            <>
              <ul className="flex overflow-x-auto lg:overflow-hidden 2xl:grid 2xl:grid-cols-4 lg:grid lg:grid-cols-3 list-none gap-16 w-full">
                <>
                  {profileUserAdverts!.data.map((advert) => {
                    return (
                      <li
                        key={advert.id}
                        className="relative flex flex-col min-w-[312px] lg:w-fit lg:m-auto items-start gap-6 border-none rounded shadow-lg p-4 bg-white brightness-95 hover:brightness-100 transition-all ease-in-out duration-500 cursor-pointer"
                        onClick={() => router.push(`/${advert.id}`)}
                      >
                        <div className="w-full">
                          <div className="flex w-[100%] h-[200px] items-center overflow-hidden p-5 rounded">
                            <Image
                              className="flex m-auto object-fill rounded"
                              src={advert.image_cape}
                              width={250}
                              height={250}
                              alt="imagem do carro"
                            />
                          </div>
                        </div>
                        <section className="flex flex-col items-start justify-start gap-4 w-full">
                          <div className="w-[250px]">
                            <h2 className="text-base font-semibold text-gray-10 truncate">
                              {advert.brand} - {advert.model}
                            </h2>
                          </div>
                          <p className="text-sm font-normal text-gray-20 w-[240px] truncate">
                            {advert.description}
                          </p>
                          <div className="flex items-center justify-between w-full border-t-2 border-solid border-gray-50 pt-4">
                            <p className="text-sm lg:text-base font-medium text-gray-10">
                              {advert.price?.toLocaleString("pt-BR", {
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
                      </li>
                    );
                  })}
                </>
              </ul>
              <div className="flex flex-col lg:flex-row w-full gap-8 justify-center items-center">
                {profileUserAdverts!.prev && (
                  <p
                    onClick={() => {
                      getProfileAdverts(profileId, profileUserAdverts!.prev),
                        scrollToTop();
                    }}
                    className="text-lg font-semibold text-brand-2 cursor-pointer"
                  >
                    {`<`} Anterior
                  </p>
                )}
                <p className="text-lg font-semibold text-gray-30">
                  página {profileUserAdverts!.currentPage} de{" "}
                  {profileUserAdverts!.lastPage}
                </p>
                {profileUserAdverts!.next && (
                  <p
                    onClick={() => {
                      getProfileAdverts(profileId, profileUserAdverts!.next),
                        scrollToTop();
                    }}
                    className="text-lg font-semibold text-brand-2 cursor-pointer"
                  >
                    Seguinte {`>`}
                  </p>
                )}
              </div>
            </>
          )}
          {profileUserAdverts && profileUserAdverts!.data?.length <= 0 && (
            <div className="h-[500px] flex justify-center items-center">
              <p className="text-2xl lg:text-5xl font-medium text-gray-30">
                Não há nenhum anúncio...
              </p>
            </div>
          )}
        </section>
      </>
    </main>
  );
};

export default ProfilePageViewUser;
