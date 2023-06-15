"use client";

import { AuhtProviderProps, AuthContextProps } from "@/schemas/authContext";
import { LoginData } from "@/schemas/login.schema";
import { api } from "@/service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { AdvertsProvider } from "../adverts";
import { CreateRegisterData } from "@/schemas/register.schema";

export const AuthContext = createContext({} as AuthContextProps);

export const AuhtProvider = async ({ children }: AuhtProviderProps) => {
	const router = useRouter();

	const [btnLoading, setBtnLoading] = useState(false);
	const [loading, setLoading] = useState(true);

	const login = async (data: LoginData) => {
		console.log(data);
		// try {
		//     setBtnLoading(true)
		//     /* const response = await api.post("login/", data)
		//     api.defaults.headers.common.Authorization = `Bearer ${response.data.token}` */
		//     // falta setar o token nos cookies e possivelmente o id (dependendo do que for passado no token como reposta)
		//
		//     router.push("/dashboard")
		//
		//     // falta um toast de resposta
		// } catch (error) {
		//     const err = error as AxiosError
		//     console.log(err)
		//     // falta um toast de resposta
		// } finally {
		//     setBtnLoading(false)
		// }
	};

	const registerFunction = async (data: CreateRegisterData) => {
		try {
			//Está dando problema nesse set -> setBtnLoading(true);
			const req = await api.post("users/", data);
			const res = req.data;
			console.log(res);
			router.push("/login");
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		} finally {
			setBtnLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				btnLoading,
				login,
				registerFunction,
				loading,
			}}
		>
			<AdvertsProvider>{children}</AdvertsProvider>
		</AuthContext.Provider>
	);
};
