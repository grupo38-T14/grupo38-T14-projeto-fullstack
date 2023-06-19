"use client";

import { retrieveUser } from "@/schemas/user.schema";
import { UserContextProps, UserProviderProps } from "@/schemas/userContext";
import { api } from "@/service";
import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<retrieveUser | undefined>();
  const [cookieId, setCookieId] = useState<string | undefined>(undefined);
  const [cookieToken, setCookieToken] = useState<string | undefined>(undefined);
  const [initialsUser, setInitialsUser] = useState("");
  const cookies = parseCookies();

  useEffect(() => {
    console.log(cookies);

    if (cookies["user.token"]) {
      setCookieId(cookies["user.id"]);
      setCookieToken(cookies["user.token"]);
      getProfile(cookies["user.id"]);
    }
  }, []);

  const getInitials = (name: string) => {
    const firstLetter = name[0];
    const secondLetter = name[name.indexOf(" ") + 1];
    return `${firstLetter}${secondLetter}`;
  };

  const getProfile = async (id: string): Promise<void> => {
    try {
      const res = await api.get(`users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        getInitials,
        cookieId,
        cookieToken,
        setUser,
        user,
        initialsUser,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
