import { AdvertsContext } from "@/providers/adverts";
import { useContext } from "react";

export const useAdverts = () => {
  const advertsContext = useContext(AdvertsContext);

  return advertsContext;
};
