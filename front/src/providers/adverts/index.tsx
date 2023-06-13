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
  const [currentAdverts, setCurrentAdverts] = useState<listRetrieveAdvertsType>([]);
  const [advert, setAdvert] = useState<retrieveAdvertType>();
  const [page, setPage] = useState<IPageProps>();
  const [minKm, setMinKm] = useState<number>(0)
  const [maxKm, setMaxKm] = useState<number>(1000000)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(1000000)
  const [loading, setLoading] = useState(true)

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
    try {
      const req = await api.get(`adverts?page=${page}&${filter}=${filterName}`)
      const res: retrieveAdvertPaginationType = req.data

      setCurrentAdverts(res.data.filter((e) => e.is_active == true))
      setPage({current: res.currentPage, last: res.lastPage, next: res.next, prev: res.prev, filter: filter, filterName: filterName})
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const retrieveFilterByKmPriceAdvert = async (type: "KM" | "Price", value: string, setState: string) => {
    const newValue = Number(value)
    try {
      const filterMin = type == "KM" ? "minKM" : "minPrice"
      const filterMax = type == "KM" ? "maxKM" : "maxPrice"
      let filterValueMin = type == "KM" ? minKm : minPrice
      let filterValueMax = type == "KM" ? maxKm : maxPrice
      if(type == "KM" && setState == "min"){
        setMinKm(newValue)
        filterValueMin = newValue
      }
      if(type == "Price" && setState == "min"){
        setMinPrice(newValue)
        filterValueMin = newValue
      }
      if(type == "KM" && setState == "max"){
        setMaxKm(newValue)
        filterValueMax = newValue
      }
      if(type == "Price" && setState == "max"){
        setMaxPrice(newValue)
        filterValueMax = newValue
      }

      const req = await api.get(`adverts?page=${page}&${filterMin}=${filterValueMin}&${filterMax}=${filterValueMax}`)
      const res: retrieveAdvertPaginationType = req.data

      setCurrentAdverts(res.data.filter((e) => e.is_active == true))
      setPage({current: res.currentPage, last: res.lastPage, next: res.next, prev: res.prev, filterMin: filterMin, filterValueMin: filterValueMin, filterMax: filterMax, filterValueMax: filterValueMax})
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    retrieveAdvert();
  }, [])

  return (
    <AdvertsContext.Provider
      value={{ retrieveAdvert, retrieveUniqueAdvert, advert, createAdvert, deleteAdvert, updateAdvert, page, minKm, setMinKm, maxKm, setMaxKm, minPrice, setMinPrice, maxPrice, setMaxPrice, currentAdverts, retrieveFilterByKmPriceAdvert, loading}}
    >
      {children}
    </AdvertsContext.Provider>
  );
};
