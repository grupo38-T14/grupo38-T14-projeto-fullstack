"use client";

import { useUser } from "@/hooks/userHook";
import { retrieveUser } from "@/schemas/user.schema";
import Image from "next/image";
import React from "react";

interface imageProfileProps {
  userProfile: retrieveUser | undefined;
  size: 1 | 2;
}

const ImageProfile = ({ userProfile, size }: imageProfileProps) => {
  
  return (
    <div>
      {userProfile && userProfile.avatar_url ? (
        <Image
          key={userProfile.id}
          src={userProfile.avatar_url}
          alt={`Imagem do anúncio ${userProfile.id}`}
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
          {userProfile && userProfile.name[0]}
        </p>
      )}
    </div>
  );
};

export default ImageProfile;
