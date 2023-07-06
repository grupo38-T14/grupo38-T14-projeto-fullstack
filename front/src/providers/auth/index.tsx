"use client";

import {
  AuhtProviderProps,
  AuthContextProps,
  tokenDecode,
} from "@/schemas/authContext";
import { LoginData } from "@/schemas/login.schema";
import { api } from "@/service";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useState } from "react";
import { AdvertsProvider } from "../adverts";
import { CreateRegisterData } from "@/schemas/register.schema";
import { listRetrieveAdvertsType } from "@/schemas/advert.schema";
import Notify from "@/components/notify";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";
import { UserProvider } from "../users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateNewPasswordData,
  RecoveryPasswordData,
} from "@/schemas/recoveryPassword.schema";

export const AuthContext = createContext({} as AuthContextProps);

export const AuhtProvider = ({ children }: AuhtProviderProps) => {
  const router = useRouter();
  const path = usePathname();

  const [userAdverts, setUserAdverts] = useState<listRetrieveAdvertsType>([]);
  const [loading, setLoading] = useState(true);
  const [oldPath, setOldPath] = useState("");

  const login = async (
    data: LoginData,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setBtnLoading(true);
      const response = await api.post("login/", data);
      api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      let decoded: tokenDecode = jwtDecode(response.data.token);

      setCookie(null, "user.token", response.data.token, {
        maxAge: 60 * 30,
        path: "/",
      });
      setCookie(null, "user.id", decoded.sub, {
        maxAge: 60 * 30,
        path: "/",
      });

      router.push("/");

      Notify({ type: "success", message: "Login feito com sucesso!" });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      Notify({
        type: "error",
        message: "Ops! e-mail ou senha invalidos. Tente novamente!",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const registerFunction = async (
    data: CreateRegisterData,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setBtnLoading(true);
      await api.post("users/", data).then((res) => res.data);
      Notify({ type: "success", message: "Cadastro feito com sucesso!" });
      setOldPath("/register");

      router.push("/login");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      if (err.message === "Request failed with status code 409") {
        Notify({ type: "error", message: "Email ou CPF já existe!" });
      }
      Notify({
        type: "error",
        message: "Ops! Alguma coisa deu errado. Tente novamente!",
      });
    } finally {
      setBtnLoading(false);
    }
  };
  const sendRecoveryEmail = async (data: RecoveryPasswordData) => {
    await api
      .post(`users/resetPassword`, data)
      .then()
      .catch((error) => {
        console.error(error);
      });
  };

  const createNewPassword = async (
    data: CreateNewPasswordData,
    token: string
  ) => {
    await api
      .patch(`users/resetPassword/${token}`, { password: data.password })
      .then(() => {
        setOldPath("/resetPassword");
        Notify({ type: "success", message: "Senha atualizada com sucesso !" });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        Notify({ type: "error", message: "Erro ao atualizar a senha" });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        registerFunction,
        userAdverts,
        loading,
        oldPath,
        setOldPath,
        sendRecoveryEmail,
        createNewPassword,
      }}
    >
      <ToastContainer />
      <AdvertsProvider>
        <UserProvider>{children}</UserProvider>
      </AdvertsProvider>
    </AuthContext.Provider>
  );
};
