import { Dispatch, SetStateAction } from "react";
import { LoginData } from "./login.schema";
import { CreateRegisterData } from "./register.schema";
import { retrieveUser } from "./user.schema";
import { retrieveAdvertPaginationType } from "./advert.schema";

export interface AuhtProviderProps {
	children: React.ReactNode;
}

export interface AuthContextProps {
	loading: boolean;
	login: (
		data: LoginData,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	registerFunction: (
		data: CreateRegisterData,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	oldPath: string;
	setOldPath: React.Dispatch<React.SetStateAction<string>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
	loggedUser: retrieveUser | undefined;
	loggedUserAdverts: retrieveAdvertPaginationType | undefined;
	getProfileAdverts: (pageNumber: number) => Promise<void>;
}

export interface tokenDecode {
	iat: number;
	exp: number;
	sub: string;
}
