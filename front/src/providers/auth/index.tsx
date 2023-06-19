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
import { createContext, useEffect, useState } from "react";
import { AdvertsProvider } from "../adverts";
import { CreateRegisterData } from "@/schemas/register.schema";
import Notify from "@/components/notify";
import { parseCookies, setCookie } from "nookies";
import jwtDecode from "jwt-decode";
import { retrieveUser } from "@/schemas/user.schema";
import { retrieveAdvertPaginationType } from "@/schemas/advert.schema";

export const AuthContext = createContext({} as AuthContextProps);

export const AuhtProvider = ({ children }: AuhtProviderProps) => {
	const router = useRouter();
	const path = usePathname();

	const [loading, setLoading] = useState(true);
	const [oldPath, setOldPath] = useState("");
	/* const [loggedUser, setLoggedUser] = useState<retrieveUser | undefined>(); */
	const [loggedUserAdverts, setLoggedUserAdverts] = useState<
		retrieveAdvertPaginationType | undefined
	>();

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

	/* const getProfile = async () => {
		const cookies = parseCookies();
		try {
			const req = await api.get(`users/${cookies["user.id"]}`);
			const res: retrieveUser = req.data;
			setLoggedUser(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}; */

	const getProfileAdverts = async (pageNumber?: number) => {
		const cookies = parseCookies();
		try {
			if (!pageNumber || pageNumber < 2) {
				const req = await api.get(`users/${cookies["user.id"]}/adverts`);
				const res: retrieveAdvertPaginationType = req.data;
				setLoggedUserAdverts(res);
			} else {
				const req = await api.get(
					`users/${cookies["user.id"]}/adverts?page=${pageNumber}`
				);
				const res: retrieveAdvertPaginationType = req.data;
				setLoggedUserAdverts(res);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		/* getProfile(); */
		getProfileAdverts();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				login,
				registerFunction,
				loading,
				oldPath,
				setOldPath,
				setLoading,
				/* loggedUser,
				setLoggedUser, */
				loggedUserAdverts,
				getProfileAdverts,
			}}
		>
			<AdvertsProvider>{children}</AdvertsProvider>
		</AuthContext.Provider>
	);
};
