import { LoginData } from "./login.schema";
import { CreateRegisterData } from "./register.schema";

export interface AuhtProviderProps {
	children: React.ReactNode;
}

export interface AuthContextProps {
	btnLoading: boolean;
	login: (
		data: LoginData,
		setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => void;
	registerFunction: (data: CreateRegisterData) => void;
	loading: boolean;
}
