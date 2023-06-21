import { Dispatch, SetStateAction } from "react";
import { editUserType, retrieveUser } from "./user.schema";

export interface UserContextProps {
  getInitials: (name: string) => string;
  cookieId: string | undefined;
  cookieToken: string | undefined;
  setUser: Dispatch<SetStateAction<retrieveUser | undefined>>;
  user: retrieveUser | undefined;
  initialsUser: string;
  getProfile: (id: string) => Promise<void>;
  editUser: (
    data: editUserType,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  deleteUser: (
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  logOut: () => void;
}

export interface UserProviderProps {
  children: React.ReactNode;
}
