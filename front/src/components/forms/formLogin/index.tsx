"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "@/schemas/login.schema";

import Button from "@/components/button";
import Input from "@/components/inputs";
import { useAuth } from "@/hooks/authHook";
import { RiLoader4Line } from "react-icons/ri";

const FormLogin = () => {
  const { login } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  
  const handleLogin = (data: LoginData) => login(data, setBtnLoading);
  
  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={handleSubmit(handleLogin)}
    >
      <fieldset className="relative flex flex-col gap-2">
        <label htmlFor={"E-mail"} className="input-label">
          E-mail
        </label>
        <>
          <input
            type="email"
            id="email"
            placeholder="Digitar e-mail"
            {...register("email")}
            className="
				input-base
				input-placeholder
				reset-appearence
				"
          />
        </>
        {errors.email && (
          <span className="absolute -bottom-4 text-xs text-feedback-alert1">
            {errors.email.message}
          </span>
        )}
      </fieldset>
      <fieldset className="relative flex flex-col gap-2">
        <label htmlFor={"Senha"} className="input-label">
			Senha
        </label>
        <>
          <input
            type="password"
            id="password"
            placeholder="Digitar senha"
            {...register("password")}
            className="
				input-base
				input-placeholder
				reset-appearence
				"
          />
        </>
        {errors.password && (
          <span className="absolute -bottom-4 text-xs text-feedback-alert1">
            {errors.password.message}
          </span>
        )}
      </fieldset>
      <span className="body-2 self-end -mt-4 text-gray-20">
        Esqueci minha senha
      </span>
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
  );
};

export default FormLogin;
