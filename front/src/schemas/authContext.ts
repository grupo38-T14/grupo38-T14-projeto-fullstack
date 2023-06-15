import { LoginData } from "./login.schema";
import { CreateRegisterData, RegisterData } from "./register.schema";

export interface AuhtProviderProps {
	children: React.ReactNode;
}

export interface AuthContextProps {
	btnLoading: boolean;
	login: (data: LoginData) => void;
	registerFunction: (data: CreateRegisterData) => void;
	loading: boolean;
}
