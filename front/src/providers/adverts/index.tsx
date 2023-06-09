"use client";
import {
  createAdvertType,
  listRetrieveAdvertsType,
  retrieveAdvertType,
  updateAdvertType,
} from "@/schemas/advert.schema";
import {
  AdvertsContextValues,
  AdvertsProviderProps,
} from "@/schemas/advertsContext";
import { api } from "@/service";
import { createContext, useEffect, useState } from "react";

export const AdvertsContext = createContext<AdvertsContextValues>(
  {} as AdvertsContextValues
);

export const AdvertsProvider = ({ children }: AdvertsProviderProps) => {
  const [adverts, setAdverts] = useState<listRetrieveAdvertsType>([]);
  const [advert, setAdvert] = useState<retrieveAdvertType>();

  const createAdvert = async (data: createAdvertType) => {
    await api
      .post(`adverts/`, data)
      .then((res) => retrieveAdvert())
      .catch((err) => console.error(err));
  };
  const deleteAdvert = async (id: string) => {
    await api
      .delete(`adverts/${id}`)
      .then((res) => retrieveAdvert())
      .catch((err) => console.error(err));
  };
  const updateAdvert = async (id: string, data: updateAdvertType) => {
    await api
      .patch(`adverts/${id}`, data)
      .then((res) => retrieveAdvert())
      .catch((err) => console.error(err));
  };

  const retrieveAdvert = async () => {
    await api
      .get("adverts/")
      .then(({ data }) => setAdverts(data.data))
      .catch((err) => console.error(err));
  };

  const retrieveUniqueAdvert = async (id: string) => {
    await api
      .get(`adverts/${id}`)
      .then(({ data }) => setAdvert(data.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    retrieveAdvert();
  }, []);

  return (
    <AdvertsContext.Provider
      value={{
        createAdvert,
        deleteAdvert,
        retrieveAdvert,
        updateAdvert,
        retrieveUniqueAdvert,
        adverts,
        advert,
      }}
    >
      {children}
    </AdvertsContext.Provider>
  );
};
