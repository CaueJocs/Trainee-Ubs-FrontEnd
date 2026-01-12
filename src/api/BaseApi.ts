import { AuthService } from "@/services/AuthService";
import axios, { HttpStatusCode } from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL as string);

export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor to add Authorization header to each request if token is available
 */
http.interceptors.request.use(
  (config) => {
    const token = AuthService.getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor to handle 401 Unauthorized responses
 */
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      AuthService.logout();
    }
    return Promise.reject(error);
  }
);