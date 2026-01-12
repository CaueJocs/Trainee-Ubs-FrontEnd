import type { DepartmentResponse } from "@/interfaces/Department";
import { http } from "./BaseApi";

export const DepartmentApi = {

  getAllDepartments: async (): Promise<DepartmentResponse[]> => {
    const response = await http.get<DepartmentResponse[]>('/departments');
    return response.data;
  },

};