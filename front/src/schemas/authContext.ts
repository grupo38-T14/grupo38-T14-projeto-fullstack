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
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	/* loggedUser: retrieveUser | undefined;
	setLoggedUser: Dispatch<
		SetStateAction<
			| {
					email: string;
					name: string;
					cpf: string;
					phone: string;
					birth: Date;
					description: string;
					account_type: boolean;
					address: {};
					id: string;
					is_active: boolean;
					created_at: Date;
					avatar_url?: string | undefined;
			  }
			| undefined
		>
	>; */
	loggedUserAdverts: retrieveAdvertPaginationType | undefined;
	getProfileAdverts: (pageNumber: number) => Promise<void>;
}

export interface tokenDecode {
	iat: number;
	exp: number;
	sub: string;
}
