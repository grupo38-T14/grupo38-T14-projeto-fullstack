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
import { CreateRegisterData } from "@/schemas/register.schema";
import Notify from "@/components/notify";
import { setCookie } from "nookies";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext, UserProvider } from "../users";
import { useUser } from "@/hooks/userHook";

export const AuthContext = createContext({} as AuthContextProps);

export const AuhtProvider = ({ children }: AuhtProviderProps) => {
  const router = useRouter();
  const path = usePathname();
  const { user, setUser } = useUser();

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

  const registerFunction = async (
		data: CreateRegisterData,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			setBtnLoading(true);
			await api.post("users/", data).then((res) => res.data);
			Notify({ type: "success", message: "Cadastro feito com sucesso!" });
			router.push("/login");
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
			if (err.message === "Request failed with status code 409") {
				Notify({ type: "error", message: "Email ou CPF já existe!" });
			}
		} finally {
			setBtnLoading(false);
		}
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
      }}
    >
<<<<<<< HEAD
      <UserProvider>
        <AdvertsProvider>{children}</AdvertsProvider>
      </UserProvider>
=======
      	<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
      <AdvertsProvider>
        <UserProvider>{children}</UserProvider>
      </AdvertsProvider>
>>>>>>> f16a3ae09f994bc706e3bad69e11e4a7ef1f2390
    </AuthContext.Provider>
  );
};
