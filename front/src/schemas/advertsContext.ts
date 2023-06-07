import { listRetrieveAdvertsType, retrieveAdvertType } from "./advert.schema";

export interface AdvertsContextValues {
  retrieveAdvert: () => void;
  retrieveUniqueAdvert: (id: string) => void;
  adverts: listRetrieveAdvertsType | undefined;
  advert: retrieveAdvertType | undefined;
  brands: string[] | [];
  models: string[] | [];
  colors: string[] | [];
  years: number[] | [];
  fuels: string[] | [];
}

export interface AdvertsProviderProps {
  children: React.ReactNode;
}
