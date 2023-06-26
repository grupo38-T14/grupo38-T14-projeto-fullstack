"use client";

import { useUser } from "@/hooks/userHook";
import { retrieveUser } from "@/schemas/user.schema";
import Image from "next/image";
import React from "react";

interface imageProfileProps {
  user: retrieveUser;
  size: 1 | 2;
}

const ImageProfile = ({ user, size }: imageProfileProps) => {
  const { getInitials } = useUser();

  return (
    <div>
      {user && user.avatar_url ? (
        <Image
          key={user.id}
          src={user.avatar_url}
          alt={`Imagem do anúncio ${user.id}`}
          width={77}
          height={77}
          className="rounded-full"
        />
      ) : (
        <p
          className={`rounded-full bg-brand-1 text-white  flex items-center justify-center ${
            size == 2
              ? "w-[32px] h-[32px]  text-sm"
              : "w-[77px] h-[77px] md:h-[104px] md:w-[104px] text-xl md:text-3xl"
          } `}
        >
          {user && getInitials(user.name)}
        </p>
      )}
    </div>
  );
};

export default ImageProfile;
