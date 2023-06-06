import { listRetrieveAdvertsType, retrieveAdvertType } from "./advert.schema";

export interface AdvertsContextValues {
  retrieveAdvert: () => void;
  retrieveUniqueAdvert: (id: string) => void;
  adverts: listRetrieveAdvertsType | undefined;
  advert: retrieveAdvertType | undefined;
}

export interface AdvertsProviderProps {
  children: React.ReactNode;
}
