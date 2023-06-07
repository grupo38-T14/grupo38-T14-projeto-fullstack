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

  const createAdvert = (data: createAdvertType) => {};
  const deleteAdvert = (id: string) => {};
  const updateAdvert = (id: string, data: updateAdvertType) => {};
  const retrieveAdvert = async () => {
    await api
      .get("adverts/")
      .then((res) => setAdverts(res.data))
      .catch((err) => console.error(err));
  };
  const retrieveUniqueAdvert = async (id: string) => {
    await api
      .get(`adverts/${id}`)
      .then((res) => setAdvert(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    retrieveAdvert();
  }, []);

  return (
    <AdvertsContext.Provider
      value={{ retrieveAdvert, retrieveUniqueAdvert, adverts, advert }}
    >
      {children}
    </AdvertsContext.Provider>
  );
};
