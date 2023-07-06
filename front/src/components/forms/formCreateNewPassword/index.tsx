import Button from "@/components/button";
import Input from "@/components/inputs";

import { RiLoader4Line } from "react-icons/ri";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateNewPasswordSchema,
  CreateNewPasswordData,
} from "@/schemas/recoveryPassword.schema";
import { useAuth } from "@/hooks/authHook";
import { usePathname } from "next/navigation";

export interface FormCreateNewPassword {
  token: string;
}

const FormCreateNewPassword = ({ token }: FormCreateNewPassword) => {
  const { createNewPassword, setOldPath } = useAuth();
  const path = usePathname();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateNewPasswordData>({
    resolver: zodResolver(CreateNewPasswordSchema),
  });

  const handleNewPassword = (data: CreateNewPasswordData) => {
    setOldPath(path);
    createNewPassword(data, token);
  };

  return (
    <>
      <div className="">
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
          {/* <div className="flex flex-col font-sans text-sm font-medium leading-6">
            <span>
              Não ter letras e números repetidos ou sequenciais, ex: aaa,123
            </span>
            <span>Mínimo de 8 caracteres.</span>
            <span>Mínimo de 1 elemento especial (#$%@)</span>
            <span>Mínimo de 1 número.</span>
            <span>Ter letras MAIÚSCULAS.</span>
            <span>Ter letras minúsculas.</span>
          </div> */}

          <Input
            label="Confime sua senha "
            placeholder="Confirme sua senha "
            type="password"
            error={errors.confirm && errors.confirm.message}
            register={register("confirm")}
          />

          <Button
            type={/*!isDirty || !isValid ? "disableBland" : */ "brand"}
            submit
            // disable={!isDirty || !isValid}
          >
            {!btnLoading ? (
              "Redefinir senha"
            ) : (
              <RiLoader4Line size={30} color="#fff" className="animate-spin" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormCreateNewPassword;
