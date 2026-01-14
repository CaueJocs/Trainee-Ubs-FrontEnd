import type { DepartmentResponse } from "@/interfaces/Department";
import { http } from "./BaseApi";

export const DepartmentApi = {

  getAllDepartments: async (): Promise<DepartmentResponse[]> => {
    const response = await http.get<DepartmentResponse[]>('/departments');
    return response.data;
  },

  renameDepartment: async (currentName: string, newName: string): Promise<void> => {
    await http.patch(`/departments/${currentName}/name`, { 
      newName: newName 
    });
  },

  createDepartment: async (name: string, currency: string): Promise<DepartmentResponse> => {
    const response = await http.post('/departments', {
      name,
      currency,
    });
    return response.data;
  }

};