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
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [fuels, setFuels] = useState<string[]>([]);

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

  const getFilters = async () => {
    const adverts = await api.get<listRetrieveAdvertsType>("adverts/")
    adverts.data.map((e) => {
      if(!brands.includes(e.brand)){
        setBrands([...brands, e.brand])
      }
      if(!models.includes(e.model)){
        setModels([...models, e.model])
      }
      if(!colors.includes(e.color)){
        setColors([...colors, e.color])
      }
      if(!years.includes(e.year)){
        setYears([...years, e.year])
      }
      if(!fuels.includes(e.fuel)){
        setFuels([...fuels, e.fuel])
      }
    })
    brands.sort()
    models.sort()
    colors.sort()
    years.sort()
    fuels.sort()
  }

  useEffect(() => {
    retrieveAdvert();
    getFilters();
  });

  return (
    <AdvertsContext.Provider
      value={{ retrieveAdvert, retrieveUniqueAdvert, adverts, advert, brands, models, colors, years, fuels }}
    >
      {children}
    </AdvertsContext.Provider>
  );
};
