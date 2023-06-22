"use client";

import Notify from "@/components/notify";
import { editUserType, retrieveUser } from "@/schemas/user.schema";
import { UserContextProps, UserProviderProps } from "@/schemas/userContext";
import { api } from "@/service";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<retrieveUser | undefined>();
  const [cookieId, setCookieId] = useState<string | undefined>(undefined);
  const [cookieToken, setCookieToken] = useState<string | undefined>(undefined);
  const [initialsUser, setInitialsUser] = useState("");
  const cookies = parseCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookies["user.token"]) {
      setCookieId(cookies["user.id"]);
      setCookieToken(cookies["user.token"]);
      getProfile(cookies["user.id"]);
    }
  }, [cookies, user]);

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

  const logOut = () => {
    destroyCookie(null, "user.id");
    setUser(undefined);
    destroyCookie(null, "user.token");
    Notify({ type: "logout", message: "Saindo..." });
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const editUser = async (
    data: editUserType,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await api
      .patch(`users/${cookieId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((res) => {
        setBtnLoading(true);
        setUser(res.data);
        Notify({ type: "success", message: "Alteração feita com sucesso!" });
      })
      .catch((error) => console.error(error))
      .finally(() => setBtnLoading(false));
  };

  const deleteUser = async (
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await api
      .delete(`users/${cookieId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((res) => {
        setBtnLoading(true);
        logOut();
        Notify({ type: "success", message: "Perfil excluído com sucesso!" });
      })
      .catch((error) => console.error(error))
      .finally(() => setBtnLoading(false));
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
        logOut,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
