import { Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  IPageProps,
  createAdvertType,
  listRetrieveAdvertsType,
  retrieveAdvertType,
} from "./advert.schema";

export interface AdvertsContextValues {
  createAdvert: (data: createAdvertType) => void;
  deleteAdvert: (id: string) => void;
  updateAdvert: (id: string, data: createAdvertType) => void;
  retrieveAdvert: (filter?: string, filterName?: string | number, page?: number) => void;
  retrieveUniqueAdvert: (id: string) => void;
  currentAdverts: listRetrieveAdvertsType;
  advert: retrieveAdvertType | undefined;
  page: IPageProps | undefined;
  setMinKm: Dispatch<SetStateAction<number>>;
  setMaxKm: Dispatch<SetStateAction<number>>;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  searchAdverts: (event: ChangeEvent<HTMLInputElement>) => void;
  retrieveFilterByKmPriceAdvert: (type: "KM" | "Price") => void;
  loading: boolean
}

export interface AdvertsProviderProps {
  children: React.ReactNode;
}
