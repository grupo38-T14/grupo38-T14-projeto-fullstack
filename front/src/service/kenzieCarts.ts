import axios from "axios";

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}

export const apiKenzieCars = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/cars",
  timeout: 10000,
});

export const getBrands = async () => {
  const { data } = await apiKenzieCars.get("");

  const keys = Object.keys(data);

  return keys;
};

export const getCarsByBrands = async (brand: string) => {
  const { data } = await apiKenzieCars.get<Car[]>(`?brand=${brand}`);

  return data;
};
