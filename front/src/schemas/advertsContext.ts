import { Dispatch, SetStateAction } from "react";
import {
  createAdvertType,
  listRetrieveAdvertsType,
  retrieveAdvertPaginationType,
  retrieveAdvertType,
} from "./advert.schema";

export interface AdvertsContextValues {
  createAdvert: (data: createAdvertType) => void;
  deleteAdvert: (id: string) => void;
  updateAdvert: (id: string, data: createAdvertType) => void;
  retrieveAdvert: (page: number | 1) => void;
  retrieveUniqueAdvert: (id: string) => void;
  adverts: listRetrieveAdvertsType;
  advert: retrieveAdvertType | undefined;
  brands: string[] | [];
  models: string[] | [];
  colors: string[] | [];
  years: number[] | [];
  fuels: string[] | [];
  filterAdverts: string | number
  setFilterAdverts: Dispatch<SetStateAction<string | number>>;
  page: retrieveAdvertPaginationType | undefined;
  allAdverts: listRetrieveAdvertsType;
}

export interface AdvertsProviderProps {
  children: React.ReactNode;
}
