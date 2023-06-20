import { LoginData } from "./login.schema";
import { CreateRegisterData } from "./register.schema";

export interface AuhtProviderProps {
	children: React.ReactNode;
}

export interface AuthContextProps {
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
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	hidden: boolean;
	setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface tokenDecode {
	iat: number;
	exp: number;
	sub: string;
}
