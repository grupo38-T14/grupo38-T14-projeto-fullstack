"use client";

import Notify from "@/components/notify";
import { EditAddressType, retrieveAddressType } from "@/schemas/address.schema";
import { retrieveAdvertType } from "@/schemas/advert.schema";
import { editUserType, retrieveUser } from "@/schemas/user.schema";
import { UserContextProps, UserProviderProps } from "@/schemas/userContext";
import { api } from "@/service";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<retrieveUser | undefined>();
  const [userAddress, setUserAddress] = useState<
    retrieveAddressType | undefined
  >();
  const [cookieId, setCookieId] = useState<string | undefined>(undefined);
  const [cookieToken, setCookieToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const cookies = parseCookies();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(
    {} as retrieveUser | undefined
  );

  useEffect(() => {
    if (cookies["user.token"]) {
      api.defaults.headers.common.authorization = `Bearer ${cookies["user.token"]}`;
      setCookieId(cookies["user.id"]);
      setCookieToken(cookies["user.token"]);
      getProfile(cookies["user.id"]);
    } else {
      setUser(undefined);
      setUserAddress(undefined);
    }
    setLoading(false);
  }, [cookies]);

  const getProfile = async (id: string): Promise<void> => {
    try {
      const res = await api.get(`users/${id}`);
      setUser(res.data);
      setUserAddress(res.data.address);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (id: string): Promise<retrieveUser | undefined> => {
    try {
      const { data } = await api.get(`users/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const pageProfile = async (advert: retrieveAdvertType) => {
    setCookie(null, "profile.id", advert.userId, {
      maxAge: 60 * 30,
      path: "/",
    });
    setUserProfile(await getUser(advert.userId));
    router.push(`/profile/${advert.userId}`);
  };

  const logOut = () => {
    destroyCookie(null, "user.id");
    setUser(undefined);
    destroyCookie(null, "user.token");
    destroyCookie(null, "profile.id");
    Notify({ type: "logout", message: "Saindo..." });

    router.push("/");
  };

  const editUser = async (
    data: editUserType,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setBtnLoading(true);
    await api
      .patch(`users/${cookieId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        Notify({ type: "success", message: "Alteração feita com sucesso!" });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setBtnLoading(false);
        setOpenModal(false);
      });
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

  const editAddress = async (
    userId: string,
    data: EditAddressType,
    loading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await api
      .patch(`addresses/${userId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieToken}`,
        },
      })
      .then((res) => {
        loading(true);
        Notify({ type: "success", message: "Endereço atualizado com sucesso" });
      })
      .catch((error) => console.error(error))
      .finally(() => loading(false));
  };

  return (
    <UserContext.Provider
      value={{
        cookieId,
        cookieToken,
        setUser,
        user,
        setUserAddress,
        userAddress,
        getProfile,
        logOut,
        editUser,
        deleteUser,
        editAddress,
        pageProfile,
        getUser,
        loading,
        userProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
