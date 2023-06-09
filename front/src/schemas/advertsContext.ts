import { Dispatch, SetStateAction } from "react";
import {
  IPageProps,
  createAdvertType,
  listRetrieveAdvertsType,
  retrieveAdvertPaginationType,
  retrieveAdvertType,
} from "./advert.schema";

export interface AdvertsContextValues {
  createAdvert: (data: createAdvertType) => void;
  deleteAdvert: (id: string) => void;
  updateAdvert: (id: string, data: createAdvertType) => void;
  retrieveAdvert: (filter?: string, filterName?: string, page?: number) => void;
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
  page: IPageProps | undefined;
  allAdverts: listRetrieveAdvertsType;
}

export interface AdvertsProviderProps {
  children: React.ReactNode;
}
