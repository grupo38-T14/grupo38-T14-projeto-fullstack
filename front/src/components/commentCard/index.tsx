"use client";

import { useUser } from "@/hooks/userHook";
import { comment } from "@/schemas/comment.schema";
import { retrieveUser } from "@/schemas/user.schema";
import React, { useEffect, useState } from "react";
import ImageProfile from "../imageProfile";

interface commentCardProps {
  comment: comment;
}

const CommentCard = ({ comment }: commentCardProps) => {
  const [user, setUser] = useState<retrieveUser>({} as retrieveUser);
  const { getUser } = useUser();

  useEffect(() => {
    (async () => {
      const retrieveUser = await getUser(comment.userId);
      setUser(retrieveUser!);
    })();
  }, [comment.userId, getUser]);

  return (
    <div className="flex flex-col gap-4 ">
      <header className="flex gap-2 items-center">
        {/* <p className="rounded-full bg-brand-1 text-white text-sm flex items-center justify-center w-[32px] h-[32px]">
          JL
        </p> */}
        <ImageProfile user={user && user} />

        <p className="text-gray-10 body-2 font-medium">{user.name}</p>
        <div className="w-1 h-1 rounded-full bg-gray-40" />
        <p className="text-gray-40 text-xs font-inter">
          há 3 dias {comment.created_at}
        </p>
      </header>
      <p className="body-2 text-gray-20 input-label">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
