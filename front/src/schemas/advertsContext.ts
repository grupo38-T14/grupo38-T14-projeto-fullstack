import { Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  IPageProps,
  createAdvertType,
  listRetrieveAdvertsType,
  retrieveAdvertType,
  updateAdvertType,
} from "./advert.schema";

export interface AdvertsContextValues {
  createAdvert: (data: createAdvertType, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => void;
  deleteAdvert: (id: string) => void;
  updateAdvert: (id: string, data: updateAdvertType) => void;
  retrieveAdvert: (filter?: string, filterName?: string | number, page?: number) => void;
  retrieveUniqueAdvert: (id: string) => void;
  currentAdverts: listRetrieveAdvertsType;
  advert: retrieveAdvertType | undefined;
  page: IPageProps | undefined;
  minKm: number
  setMinKm: Dispatch<SetStateAction<number>>;
  maxKm: number
  setMaxKm: Dispatch<SetStateAction<number>>;
  minPrice: number
  setMinPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number
  setMaxPrice: Dispatch<SetStateAction<number>>;
  retrieveFilterByKmPriceAdvert: (type: "KM" | "Price", value: string, setState: string) => void;
  loading: boolean
  btnLoading: boolean
  setBtnLoading: Dispatch<SetStateAction<boolean>>;
}

export interface AdvertsProviderProps {
	children: React.ReactNode;
}
