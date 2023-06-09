import { Dispatch, SetStateAction } from "react";
import { listRetrieveAdvertsType, retrieveAdvertType } from "./advert.schema";

export interface AdvertsContextValues {
  retrieveAdvert: () => void;
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
  filterByKmOrPrice: (data: {}) => Promise<void>
}

export interface AdvertsProviderProps {
  children: React.ReactNode;
}
