import axios from "axios";
import { BASE_URL } from "../config/env";
import { useAuthStore } from "../store/auth";

export const api = axios.create({ baseURL: BASE_URL });
console.log('base', BASE_URL)
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
