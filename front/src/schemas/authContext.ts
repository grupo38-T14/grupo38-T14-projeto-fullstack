import { listRetrieveAdvertsType } from "./advert.schema";
import { LoginData } from "./login.schema";
import { RegisterData } from "./register.schema";
import { retrieveUser } from "./user.schema";

export interface AuhtProviderProps {
	children: React.ReactNode;
}

export interface AuthContextProps {
	btnLoading: boolean;
	login: (data: LoginData) => void;
	registerFunction: (data: RegisterData) => void;
	user: retrieveUser;
	userAdverts: listRetrieveAdvertsType;
	loading: boolean;
}
