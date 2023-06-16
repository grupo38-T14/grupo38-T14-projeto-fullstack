import { listRetrieveAdvertsType } from "./advert.schema";
import { LoginData } from "./login.schema";
import { RegisterData } from "./register.schema";
import { retrieveUser } from "./user.schema";

export interface AuhtProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProps {
  loading: boolean;
  login: (
    data: LoginData,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  registerFunction: (data: RegisterData) => void;
  user: retrieveUser;
  userAdverts: listRetrieveAdvertsType;
  oldPath: string;
  setOldPath: React.Dispatch<React.SetStateAction<string>>
}

export interface tokenDecode {
  iat: number;
  exp: number;
  sub: string;
}
