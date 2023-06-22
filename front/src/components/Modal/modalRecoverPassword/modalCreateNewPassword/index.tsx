import Button from "@/components/button";
import Input from "@/components/inputs";

import { RiLoader4Line } from "react-icons/ri";

import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateNewPasswordSchema,
  CreateNewPasswordData,
} from "@/schemas/recoveryPassword.schema";

interface ModalProps {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setModalNewPassword: React.Dispatch<SetStateAction<boolean>>;
}
const ModalCreateNewPassword = ({
  setOpenModal,
  setModalNewPassword,
}: ModalProps) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateNewPasswordData>({
    resolver: zodResolver(CreateNewPasswordSchema),
  });

  const handleNewPassword = (data: CreateNewPasswordData) => {
    console.log(data);
    setBtnLoading(true);
    setTimeout(() => {}, 1000);
  };

  return (
    <>
      <div>
        <p className="h7">Crie sua nova senha </p>

        <form
          className="flex flex-col gap-6"
          noValidate
          onSubmit={handleSubmit(handleNewPassword)}
        >
          <Input
            label="Digite seu nova senha "
            placeholder="Senha"
            type="password"
            error={errors.password && errors.password.message}
            register={register("password")}
          />
          <Input
            label="Confime sua senha "
            placeholder="Confirme sua senha "
            type="password"
            error={errors.confirm && errors.confirm.message}
            register={register("confirm")}
          />

          <Button
            type={!isDirty || !isValid ? "disableBland" : "brand"}
            submit
            disable={!isDirty || !isValid}
          >
            {!btnLoading ? (
              "Entrar"
            ) : (
              <RiLoader4Line size={30} color="#fff" className="animate-spin" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ModalCreateNewPassword;
