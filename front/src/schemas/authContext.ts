import { LoginData } from "./login.schema";
import { CreateRegisterData } from "./register.schema";

export interface AuhtProviderProps {
	children: React.ReactNode;
}

export interface AuthContextProps {
	loading: boolean;
	login: (
		data: LoginData,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	registerFunction: (data: CreateRegisterData) => void;
	oldPath: string;
	setOldPath: React.Dispatch<React.SetStateAction<string>>;
}

export interface tokenDecode {
	iat: number;
	exp: number;
	sub: string;
}
