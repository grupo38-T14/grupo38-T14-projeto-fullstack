import axios from "axios";

export const api = axios.create({
  baseURL: "https://motorsshop-db.onrender.com/",
  timeout: 5000,
});

export const apiLocation = axios.create({
  baseURL: "http://viacep.com.br/ws/",
  timeout: 20000,
});
