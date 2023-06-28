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
  const dateActual = new Date();

  const getDate = (date: Date) => {
    let text = "";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayActual = dateActual.getDate();
    const monthActual = dateActual.getMonth() + 1;
    const yearActual = dateActual.getFullYear();

    const diffYear = yearActual - year;
    const diffDay = dayActual - day;
    const diffMonth = monthActual - month;

    if (diffYear >= 2) {
      text = `há ${diffYear} anos`;
    } else {
      text = `há ${diffYear} ano`;
    }

    if (diffYear === 0) {
      if (diffMonth >= 2) {
        text = `há ${diffMonth} meses`;
      } else {
        text = `há ${diffMonth} mês`;
      }

      if (diffMonth === 0) {
        if (diffDay > 1 && diffDay <= 30) {
          text = `há ${diffDay} dias`;
        } else if (diffDay === 1) {
          text = `Ontem`;
        } else if (diffDay === 0) {
          text = `Hoje`;
        }
      }
    }
    return text;
  };

  useEffect(() => {
    (async () => {
      const retrieveUser = await getUser(comment.userId);
      setUser(retrieveUser!);
    })();
  }, [comment.userId, getUser]);

  return (
    <div className="flex flex-col gap-4 ">
      <header className="flex gap-2 items-center">
        <ImageProfile user={user && user} size={2} />

        <p className="text-gray-10 body-2 font-medium">{user.name}</p>
        <div className="w-1 h-1 rounded-full bg-gray-40" />
        <p className="text-gray-40 text-xs font-inter">
          {getDate(new Date(comment.created_at))}
        </p>
      </header>
      <p className="body-2 text-gray-20 input-label">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
