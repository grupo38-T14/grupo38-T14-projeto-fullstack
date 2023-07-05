"use client";
import Button from "@/components/button";
import ImageProfile from "@/components/imageProfile";
import { retrieveUser } from "@/schemas/user.schema";
import { Dispatch, SetStateAction } from "react";

const ProfileHeader = ({
  user,
  idCookie,
  setOpenModal,
}: {
  user: retrieveUser;
  idCookie: string;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section className="flex flex-col bg-white w-full md:w-[80%]  items-start gap-6 p-7 rounded">
      <ImageProfile size={1} userProfile={user} />
      <div className="flex flex-col items-start gap-2.5 md:flex-row lg:flex-row md:items-center lg:items-center">
        <p className="text-xl font-semibold">{user?.name && user!.name}</p>
        <p className="text-smfont-medium p-2 text-brand-1 bg-brand-4 rounded">
          {user?.account_type && user!.account_type ? "Anunciante" : "Comprador"}
        </p>
      </div>
      <p className="text-base font-normal">{user?.description && user!.description}</p>

      {user?.id && user.id === idCookie && setOpenModal ? (
        <div className="w-30%">
          <Button
            size={1}
            type="outlineBrand1"
            handle={() => setOpenModal(true)}
          >
            Criar anúncio
          </Button>
        </div>
      ) : null}
    </section>
  );
};

export default ProfileHeader;
