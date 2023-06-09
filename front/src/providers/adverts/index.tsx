"use client";
import {
  createAdvertType,
  listRetrieveAdvertsType,
  retrieveAdvertPaginationType,
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
  const [allAdverts, setAllAdverts] = useState<listRetrieveAdvertsType>([]);
  const [adverts, setAdverts] = useState<listRetrieveAdvertsType>([]);
  const [filterAdverts, setFilterAdverts] = useState<string | number>("");
  const [advert, setAdvert] = useState<retrieveAdvertType>();
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [fuels, setFuels] = useState<string[]>([]);
  const [page, setPage] = useState<retrieveAdvertPaginationType>();

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

  const retrieveAdvert = async (page?: number) => {
    console.log(page)
    if(page){
      await api
      .get(`adverts?page=${page}`)
      .then((res) => {setAdverts(res.data.data); setPage(res.data)})
      .catch((err) => console.error(err));
    }else{
      await api
      .get("adverts")
      .then((res) => {setAdverts(res.data.data); setPage(res.data)})
      .catch((err) => console.error(err));
    }
  };

  const retrieveUniqueAdvert = async (id: string) => {
    await api
      .get(`adverts/${id}`)
      .then((res) => setAdvert(res.data.data))
      .catch((err) => console.error(err));
  };

  const getFilters = async () => {
    const adverts = await api.get("adverts/all")
    setAllAdverts(adverts.data)
    adverts?.data.map((e: { brand: string; model: string; color: string; year: number; fuel: string; }) => {
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
  }, [])

  useEffect(() => {
    getFilters();
  }, [filterAdverts, getFilters]);

  return (
    <AdvertsContext.Provider
      value={{ retrieveAdvert, retrieveUniqueAdvert, adverts, advert, brands, models, colors, years, fuels, filterAdverts, setFilterAdverts, createAdvert, deleteAdvert, updateAdvert, page, allAdverts}}
    >
      {children}
    </AdvertsContext.Provider>
  );
};
