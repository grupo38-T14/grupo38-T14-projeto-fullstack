"use client";
import {
  IPageProps,
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
import { createContext, useEffect, useState, ChangeEvent } from "react";

export const AdvertsContext = createContext<AdvertsContextValues>(
  {} as AdvertsContextValues
);

export const AdvertsProvider = ({ children }: AdvertsProviderProps) => {
  const [currentAdverts, setCurrentAdverts] = useState([]);
  const [advert, setAdvert] = useState<retrieveAdvertType>();
  const [page, setPage] = useState<IPageProps>();
  const [minKm, setMinKm] = useState<number>(0)
  const [maxKm, setMaxKm] = useState<number>(10000000000)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(10000000000)

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
  const retrieveUniqueAdvert = async (id: string) => {
    await api
      .get(`adverts/${id}`)
      .then(({ data }) => setAdvert(data.data.data))
      .catch((err) => console.error(err));
  };

  const retrieveAdvert = async (filter: string = "", filterName: string | number = "", page: number = 1) => {
    if(minKm !== 0 || maxKm !== 10000000000){
      const req = await api.get("adverts")
      const res = req.data
      const filteredKmAdverts = res.data.filter((advert: retrieveAdvertType) => advert.km >= minKm && advert.km <= maxKm)
      setCurrentAdverts(filteredKmAdverts)
      //setPage({current: res.currentPage, last: res.lastPage, next: res.next,prev: res.prev, filter: "KM", filterName: filterName})
    }else if(minPrice !== 0 || maxPrice !== 10000000000){
      const req = await api.get("adverts")
      const res = req.data
      const filteredPriceAdverts = res.data.filter((advert: retrieveAdvertType) => advert.price >= minPrice && advert.price <= maxPrice)
      setCurrentAdverts(filteredPriceAdverts)
      //setPage({current: res.currentPage, last: res.lastPage, next: res.next,prev: res.prev, filter: "Preço", filterName: filterName})
    }else{
      const req = await api.get(`adverts?page=${page}&${filter}=${filterName}`)
      const res = req.data
      setCurrentAdverts(res.data)
      setPage({current: res.currentPage, last: res.lastPage, next: res.next,prev: res.prev, filter: filter, filterName: filterName})
    }
    //PAGINAÇÃO ESTÁ COM PROBLEMA - estár retornando todo o objeto de paginação, pois não estou usando query params
  }

  const searchAdverts = (event: ChangeEvent<HTMLInputElement>) => {
    const findAdverts = currentAdverts.filter((advert: retrieveAdvertType) => advert.brand == event.target.value)
    setCurrentAdverts(findAdverts)
  }

  useEffect(() => {
    retrieveAdvert();
  }, [minKm, maxKm, minPrice, maxPrice])

  return (
    <AdvertsContext.Provider
      value={{ retrieveAdvert, retrieveUniqueAdvert, advert, createAdvert, deleteAdvert, updateAdvert, page, setMinKm, setMaxKm, setMinPrice, setMaxPrice, currentAdverts, searchAdverts}}
    >
      {children}
    </AdvertsContext.Provider>
  );
};
