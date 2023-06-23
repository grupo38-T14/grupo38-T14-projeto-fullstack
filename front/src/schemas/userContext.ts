import { Dispatch, SetStateAction } from "react";
import { editUserType, retrieveUser } from "./user.schema";
import { editAddressType, retrieveAddressType } from "./address.schema";

export interface UserContextProps {
  getInitials: (name: string) => string;
  cookieId: string | undefined;
  cookieToken: string | undefined;
  setUser: Dispatch<SetStateAction<retrieveUser | undefined>>;
  user: retrieveUser | undefined;
  setUserAddress: Dispatch<SetStateAction<retrieveAddressType | undefined>>;
  userAddress: retrieveAddressType | undefined;
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
  editAddress: (
    userId: string,
    data: editAddressType,
    loading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  loading: boolean;
}

export interface UserProviderProps {
  children: React.ReactNode;
}
