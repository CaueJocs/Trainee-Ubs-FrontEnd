import type { LoginRequest, LoginResponse } from "@/interfaces/Login";
import { http } from "./BaseApi";

export const AuthApi = {

  login: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>('/auth/login', loginRequest);
    return response.data;
  },

};