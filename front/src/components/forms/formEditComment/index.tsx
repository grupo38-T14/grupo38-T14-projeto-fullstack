"use client";
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";
import { RiLoader4Line } from "react-icons/ri";
import { useAdverts } from "@/hooks/advertHook";
import { retrieveAdvertType } from "@/schemas/advert.schema";
import {
  comment,
  editCommentSchema,
  editCommentType,
} from "@/schemas/comment.schema";
import TextArea from "@/components/textArea";

interface ModalProps {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  commentId: string;
  setAdvert: React.Dispatch<SetStateAction<retrieveAdvertType>>;
  commentData: comment;
}

const EditComment = ({
  setOpenModal,
  commentId,
  setAdvert,
  commentData,
}: ModalProps) => {
  const { editComment } = useAdverts();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<editCommentType>({
    resolver: zodResolver(editCommentSchema),
  });

  const handleEditComment = (data: editCommentType) =>
    editComment(commentId, data, setAdvert, setBtnLoading, setOpenModal);

  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={handleSubmit(handleEditComment)}
    >
      <TextArea
        label="Comentário:"
        register={register("comment")}
        error={errors.comment && errors.comment.message}
        placeholder="Digitar o comentário"
        defaultValue={commentData.comment}
      />
      <div className="w-6 flex gap-3">
        <Button
          type={!isDirty || !isValid ? "disableBland" : "brand"}
          submit
          disable={!isDirty || !isValid}
        >
          {!btnLoading ? (
            "Alterar"
          ) : (
            <RiLoader4Line size={30} color="#fff" className="animate-spin" />
          )}
        </Button>
        <Button type="grey6" handle={() => setOpenModal(false)}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default EditComment;
