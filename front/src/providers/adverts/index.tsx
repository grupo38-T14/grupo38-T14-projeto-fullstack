import {
  AdvertsContextValues,
  AdvertsProviderProps,
} from "@/schemas/advertsContext";
import { createContext } from "react";

export const AdvertsContext = createContext<AdvertsContextValues>(
  {} as AdvertsContextValues
);

export const AdvertsProvider = ({ children }: AdvertsProviderProps) => {
  return (
    <AdvertsContext.Provider value={{}}>{children}</AdvertsContext.Provider>
  );
};
