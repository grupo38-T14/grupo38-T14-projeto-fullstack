import Button from "@/components/button";

import { RiLoader4Line } from "react-icons/ri";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RecoveryPasswordData,
  RecoverySchema,
} from "@/schemas/recoveryPassword.schema";
import { useAuth } from "@/hooks/authHook";
import ModalMessageRecoverPassword from "../modalMessageRecoverPassword";
import Input from "@/components/inputs";

const ModalRecoverPassword = () => {
  const { sendRecoveryEmail } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [modalMessageRecoverPassword, setModalMessageRecoverPassword] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RecoveryPasswordData>({
    resolver: zodResolver(RecoverySchema),
  });

  const handleRecoveryPassword = (data: RecoveryPasswordData) => {
    sendRecoveryEmail(data);
    setEmail(data.email);
    setModalMessageRecoverPassword(true);
  };

  return (
    <>
      {modalMessageRecoverPassword ? (
        <ModalMessageRecoverPassword email={email} />
      ) : (
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
              register={register("email")}
              error={errors.email && errors.email.message}
            />
            <Button
              type={!isDirty || !isValid ? "disableBland" : "brand"}
              submit
              disable={!isDirty || !isValid}
            >
              {!btnLoading ? (
                "Entrar"
              ) : (
                <RiLoader4Line
                  size={30}
                  color="#fff"
                  className="animate-spin"
                />
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ModalRecoverPassword;
