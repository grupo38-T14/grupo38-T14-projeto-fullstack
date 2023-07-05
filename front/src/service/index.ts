import { retrieveAddressType } from "@/schemas/address.schema";
import { retrieveAdvertType } from "@/schemas/advert.schema";
import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:8000/",
	timeout: 5000,
});

export const apiLocation = axios.create({
	baseURL: "https://viacep.com.br/ws/",
	timeout: 10000,
});
