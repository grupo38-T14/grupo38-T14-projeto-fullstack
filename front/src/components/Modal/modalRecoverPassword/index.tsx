import Button from "@/components/button";
import Input from "@/components/inputs";

import { RiLoader4Line } from "react-icons/ri";

import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RecoveryPasswordData,
  RecoverySchema,
} from "@/schemas/recoveryPassword.schema";

interface ModalProps {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setModalNewPassword: React.Dispatch<SetStateAction<boolean>>;
}
const ModalRecoverPassword = ({
  setOpenModal,
  setModalNewPassword,
}: ModalProps) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RecoveryPasswordData>({
    resolver: zodResolver(RecoverySchema),
  });

  const handleRecoveryPassword = (data: RecoveryPasswordData) => {
    console.log(data);
    setBtnLoading(true);
    setTimeout(() => {
      setModalNewPassword(true);
      setOpenModal(false);
    }, 1000);
  };

  return (
    <>
      <div>
        <p className="h7">Recupere sua senha </p>
        <span>
          Enviaremos um e-mail com instruções para recuperação de senha.
        </span>
        <form
          className="flex flex-col gap-6"
          noValidate
          onSubmit={handleSubmit(handleRecoveryPassword)}
        >
          <Input
            label="E-mail"
            placeholder="Digitar e-mail"
            type="email"
            error={errors.email && errors.email.message}
            register={register("email")}
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

export default ModalRecoverPassword;
