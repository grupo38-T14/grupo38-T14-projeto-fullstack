import { AdvertsContext } from "@/providers/adverts";
import { useContext } from "react";

export const useAdverts = () => useContext(AdvertsContext);
