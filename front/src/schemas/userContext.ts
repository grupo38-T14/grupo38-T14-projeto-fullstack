import { Dispatch, SetStateAction } from "react";
import { retrieveUser } from "./user.schema";

export interface UserContextProps {
  getInitials: (name: string) => string;
  cookieId: string | undefined;
  cookieToken: string | undefined;
  setUser: Dispatch<SetStateAction<retrieveUser | undefined>>;
  user: retrieveUser | undefined;
  initialsUser: string;
  getProfile: (id: string) => Promise<void>;
}

export interface UserProviderProps {
  children: React.ReactNode;
}
