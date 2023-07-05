"use client";
import Button from "@/components/button";
import Modal from "@/components/Modal";
import FormCreateAdverts from "@/components/forms/formCreateAdverts";
import { useRouter } from "next/navigation";
import { useAdverts } from "@/hooks/advertHook";
import { useState } from "react";
import { setCookie } from "nookies";
import { FormUpdateAdvert } from "@/components/forms/formEditAdvert";
import ModalDeleteAdvert from "@/components/Modal/modalDeleteAdvert";
import { useUser } from "@/hooks/userHook";
import ProfileHeader from "../profileComponents/profileHeader";
import AdvertCard from "../advertCard";
import nookies from "nookies";

const ProfilePageViewAdmin = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const {
    getProfileAdverts,
    profileUserAdverts,
    loading,
    profileId,
    setProfileId,
  } = useAdverts();

  const { user } = useUser();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cookies = nookies.get(null, "profile.id");
  setProfileId(cookies["profile.id"]);

  const saveAdvertIdAndOpenUpdateModal = (id: string) => {
    setCookie(null, "updateAdvert.id", id, {
      maxAge: 60 * 30,
      path: "/",
    });
    setOpenUpdateModal(true);
  };


  return (
    <main className="body min-h-screen flex flex-col gap-4 px-3 pt-11 md:pt-10 w-full items-center bg-gradient-mobile">
      <>
        <ProfileHeader
          user={user!}
          idCookie={cookies["profile.id"]}
          setOpenModal={setOpenModal}
        />
        {openModal && (
          <Modal setOpenModal={setOpenModal}>
            <FormCreateAdverts setOpenModal={setOpenModal} />
          </Modal>
        )}
        <section
          className={`flex flex-col h-full gap-10 w-full lg:w-full lg:gap-12 mt-20 lg:m-0 lg:p-16 px-3 mb-14 lg:flex`}
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
                      <AdvertCard
                        advert={advert}
                        key={advert.id}
                        cookieId={cookies["profile.id"]}
                      >
                        <div className="w-[65%] flex gap-3">
                          <Button
                            size={2}
                            type="outline1"
                            handle={() =>
                              saveAdvertIdAndOpenUpdateModal(advert.id)
                            }
                          >
                            Editar
                          </Button>
                          <Button
                            size={2}
                            type="outline1"
                            handle={() => router.push(`/${advert.id}`)}
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                        {advert.is_active ? (
                          <p className="absolute left-5 top-5 bg-brand-1 text-white text-sm font-medium px-2 py-1 rounded">
                            Ativo
                          </p>
                        ) : (
                          <p className="absolute 	left-5 top-5 text-white text-sm font-medium px-2 py-1 rounded bg-gray-40">
                            Inativo
                          </p>
                        )}
                      </AdvertCard>
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
                Você não possui nenhum anúncio...
              </p>
            </div>
          )}
        </section>
        {openUpdateModal && (
          <Modal setOpenUpdateModal={setOpenUpdateModal}>
            <FormUpdateAdvert
              setOpenUpdateModal={setOpenUpdateModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </Modal>
        )}
        {openDeleteModal && (
          <Modal setOpenDeleteModal={setOpenDeleteModal}>
            <ModalDeleteAdvert setOpenDeleteModal={setOpenDeleteModal} />
          </Modal>
        )}
      </>
    </main>
  );
};

export default ProfilePageViewAdmin;
