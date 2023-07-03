import axios from "axios";

export const api = axios.create({
  baseURL: "http://motorsshop-db.onrender.com/",
  timeout: 5000,
});

export const apiLocation = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  timeout: 10000,
});
