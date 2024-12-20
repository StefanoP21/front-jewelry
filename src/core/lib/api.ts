import axios from "axios";
import { useAuthStore } from "../store/auth.store";

export const api = axios.create({
  baseURL: process.env.API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const apiDNI = axios.create({
  baseURL: process.env.API_DNI,
});

apiDNI.interceptors.request.use((config) => {
  const tokenDNI = process.env.TOKEN_DNI;
  if (tokenDNI) config.headers.Authorization = `Bearer ${tokenDNI}`;
  return config;
});
