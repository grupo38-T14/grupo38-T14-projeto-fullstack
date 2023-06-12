import { LoginData } from "./login.schema";

export interface AuhtProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProps {
  btnLoading: boolean;
  login: (data: LoginData) => void;
}
