import { LoginData } from './login.schema';
import { RegisterData } from './register.schema';

export interface AuhtProviderProps {
	children: React.ReactNode;
}

export interface AuthContextProps {
	btnLoading: boolean;
	login: (data: LoginData) => void;
	registerFunction: (data: RegisterData) => void;
}
