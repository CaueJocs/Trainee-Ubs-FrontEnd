import { EmployeeApi } from "@/api/EmployeeApi";
import type { EmployeeRequest, EmployeeResponse } from "@/interfaces/Employee";

export class EmployeeService {

  static async getAllEmployees(): Promise<EmployeeResponse[]> {
    try {
      const response = await EmployeeApi.getAllEmployees();
      return response;
    } catch (error) {
      console.error('Get All Employees Exception:', error);
      return [];
    }
  }

  static async getEmployee(id: string): Promise<EmployeeResponse | null> {
    try {
      const response = await EmployeeApi.getEmployee(id);
      return response;
    } catch (error) {
      console.error('Get Employee Exception:', error);
      return null;
    }
  }

  static async getAllManagers(): Promise<EmployeeResponse[]> {
    try {
      const response = await EmployeeApi.getAllManagers();
      return response;
    } catch (error) {
      console.error('Get All Managers Exception:', error);
      return [];
    }
  }

  static async putEmployee(id: string, employeeData: EmployeeRequest): Promise<EmployeeResponse | null> {
    try {
      const response = await EmployeeApi.putEmployee(id, employeeData);
      return response;
    } catch (error) {
      console.error('Put Employee Exception:', error);
      return null;
    }
  }

}
