import { retrieveAddressType } from "@/schemas/address.schema";
import { retrieveAdvertType } from "@/schemas/advert.schema";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://motorsshop-db.onrender.com/",
  timeout: 5000,
});

export const apiLocation = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  timeout: 10000,
});
