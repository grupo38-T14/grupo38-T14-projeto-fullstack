import {
  createAdvertType,
  listRetrieveAdvertsType,
  retrieveAdvertType,
} from "./advert.schema";

export interface AdvertsContextValues {
  createAdvert: (data: createAdvertType) => void;
  deleteAdvert: (id: string) => void;
  updateAdvert: (id: string, data: createAdvertType) => void;
  retrieveAdvert: () => void;
  retrieveUniqueAdvert: (id: string) => void;
  adverts: listRetrieveAdvertsType | undefined;
  advert: retrieveAdvertType | undefined;
}

export interface AdvertsProviderProps {
  children: React.ReactNode;
}
