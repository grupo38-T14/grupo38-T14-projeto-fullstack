import { listRetrieveAdvertsType } from "./advert.schema";
import { LoginData } from "./login.schema";
import {
  CreateNewPasswordData,
  RecoveryPasswordData,
} from "./recoveryPassword.schema";
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
  registerFunction: (
    data: CreateRegisterData,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  userAdverts: listRetrieveAdvertsType;
  oldPath: string;
  setOldPath: React.Dispatch<React.SetStateAction<string>>;

  sendRecoveryEmail: (data: RecoveryPasswordData) => Promise<void>;

  createNewPassword: (
    data: CreateNewPasswordData,
    token: string
  ) => Promise<void>;
}

export interface tokenDecode {
  iat: number;
  exp: number;
  sub: string;
}
