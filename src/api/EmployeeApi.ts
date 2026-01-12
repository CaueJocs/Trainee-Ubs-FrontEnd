import { http } from "./BaseApi";
import type { EmployeeResponse, UpdateEmployeeRequest } from "@/interfaces/Employee";

export const EmployeeApi = {

  getAllEmployees: async (): Promise<EmployeeResponse[]> => {
    const response = await http.get<EmployeeResponse[]>('/employees');
    return response.data;
  },

  getEmployee: async (id: string): Promise<EmployeeResponse> => {
    const response = await http.get<EmployeeResponse>(`/employees/${id}`);
    return response.data;
  },

  getAllManagers: async (): Promise<EmployeeResponse[]> => {
    const response = await http.get<EmployeeResponse[]>('/employees/managers');
    return response.data;
  },

  putEmployee: async (id: string, employeeData: UpdateEmployeeRequest): Promise<EmployeeResponse> => {
    const response = await http.put<EmployeeResponse>(`/employees/${id}`, employeeData);
    return response.data;
  }

};