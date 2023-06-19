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
import { createContext, useState } from "react";
import { AdvertsProvider } from "../adverts";
import { RegisterData } from "@/schemas/register.schema";
import { retrieveUser } from "@/schemas/user.schema";
import { listRetrieveAdvertsType } from "@/schemas/advert.schema";
import Notify from "@/components/notify";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";
import { UserContext, UserProvider } from "../users";

export const AuthContext = createContext({} as AuthContextProps);

export const AuhtProvider = ({ children }: AuhtProviderProps) => {
  const router = useRouter();
  const path = usePathname();

  const [user, setUser] = useState({} as retrieveUser);
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

      if (oldPath != "/register") {
        router.back();
      } else {
        router.push("/");
      }

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

  const registerFunction = async (data: RegisterData) => {
    const re = /\W+/g;
    const phone = data.phone.split(re).join("");
    try {
      const newUserData = {
        name: data.name,
        email: data.email,
        cpf: data.cpf.split(".").join(""),
        phone: phone,
        birth: data.birth ? data.birth : null,
        description: data.description,
        password: data.password,
        account_type: data.account_type === "Comprador" ? false : true,
      };
      const newUserAddres = {
        cdp: data.cep.split(".").join(""),
        state: data.state,
        city: data.city,
        street: data.street,
        number: data.number,
        complement: data.complement,
      };
      // setBtnLoading(true);
      await api.post("users/", newUserData).then((res) => res.data);
      router.push("/login");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    } finally {
      // setBtnLoading(false);
    }
  };

  const getProfile = async (id: string) => {
    //preciso chamar a função passando o id que vem do token
    try {
      const req = await api.get(`users/${id}`);
      const res: retrieveUser = req.data;
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };
  //getProfile()

  const getUserAdverts = async (userId: string) => {
    try {
      const req = await api.get(`adverts/${userId}`);
      const res: listRetrieveAdvertsType = req.data;
      setUserAdverts(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        registerFunction,
        user,
        userAdverts,
        loading,
        oldPath,
        setOldPath,
      }}
    >
      <AdvertsProvider>
        <UserProvider>{children}</UserProvider>
      </AdvertsProvider>
    </AuthContext.Provider>
  );
};
