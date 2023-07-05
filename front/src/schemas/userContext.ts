import { Dispatch, SetStateAction } from "react";
import { editUserType, retrieveUser } from "./user.schema";
import { EditAddressType, retrieveAddressType } from "./address.schema";
import { retrieveAdvertType } from "./advert.schema";

export interface UserContextProps {
  cookieId: string | undefined;
  cookieToken: string | undefined;
  setUser: Dispatch<SetStateAction<retrieveUser | undefined>>;
  user: retrieveUser | undefined;
  setUserAddress: Dispatch<SetStateAction<retrieveAddressType | undefined>>;
  userAddress: retrieveAddressType | undefined;
  getProfile: (id: string) => Promise<void>;
  editUser: (
    data: editUserType,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  deleteUser: (
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  logOut: () => void;
  editAddress: (
    userId: string,
    data: EditAddressType,
    loading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  loading: boolean;
  pageProfile: (advert: retrieveAdvertType) => void;
  getUser: (id: string) => Promise<retrieveUser | undefined>;
  userProfile: retrieveUser | undefined;
}

export interface UserProviderProps {
  children: React.ReactNode;
}
