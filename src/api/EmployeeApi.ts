import { http } from "./BaseApi";
import type { EmployeeResponse } from "@/interfaces/Employee";

export const EmployeeApi = {

  getAllEmployees: async (): Promise<EmployeeResponse[]> => {
    const response = await http.get<EmployeeResponse[]>('/employees');
    return response.data;
  },

};