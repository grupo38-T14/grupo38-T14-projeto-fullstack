"use client";

import { AuhtProviderProps, AuthContextProps } from "@/schemas/authContext";
import { LoginData } from "@/schemas/login.schema";
import { api } from "@/service";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { AdvertsProvider } from "../adverts";
import { RegisterData } from "@/schemas/register.schema";

export const AuthContext = createContext({} as AuthContextProps);

export const AuhtProvider = ({ children }: AuhtProviderProps) => {
	//   const router = useRouter();

	const [btnLoading, setBtnLoading] = useState(false);

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
			setBtnLoading(true);
			await api.post("users/", newUserData).then((res) => res.data);
			//router.push("/login");
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		} finally {
			setBtnLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ btnLoading, login, registerFunction }}>
			<AdvertsProvider>{children}</AdvertsProvider>
		</AuthContext.Provider>
	);
};
