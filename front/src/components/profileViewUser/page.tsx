"use client";
import { useAdverts } from "@/hooks/advertHook";
import ProfileHeader from "../profileComponents/profileHeader";
import AdvertCard from "../advertCard";
import nookies from "nookies";
import { useEffect } from "react";
import { useUser } from "@/hooks/userHook";

const ProfilePageViewUser = () => {
  const {
    getProfileAdverts,
    profileUserAdverts,
    profileUser,
    loading,
    profileId,
    setProfileId,
  } = useAdverts();
  const { userProfile } = useUser();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cookies = nookies.get(null, "profile.id");
  useEffect(() => {
    setProfileId(cookies["profile.id"]);
  }, []);

  return (
    <main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile">
      <>
        <ProfileHeader user={userProfile!} idCookie={cookies["profile.id"]} />
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
                  {profileUserAdverts!.data.map((advert) => (
                    <AdvertCard advert={advert} key={advert.id} />
                  ))}
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
