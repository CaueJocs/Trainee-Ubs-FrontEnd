import { EmployeeApi } from "@/api/EmployeeApi";
import type { EmployeeRequest, EmployeeResponse, UpdateEmployeeRequest } from "@/interfaces/Employee";

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

  static async putEmployee(id: string, employeeData: UpdateEmployeeRequest): Promise<EmployeeResponse | null> {
    try {
      const response = await EmployeeApi.putEmployee(id, employeeData);
      return response;
    } catch (error) {
      console.error('Put Employee Exception:', error);
      return null;
    }
  }

  static async createEmployee(employeeData: EmployeeRequest): Promise<EmployeeResponse | null> {
    try {
      const response = await EmployeeApi.createEmployee(employeeData);
      return response;
    } catch (error) {
      console.error('Create Employee Exception:', error);
      return null;
    }
  }

  static async activateEmployee(id: string): Promise<boolean> {
    try {
      await EmployeeApi.activateEmployee(id);
      return true;
    } catch (error) {
      console.error('Activate Employee Exception:', error);
      return false;
    }
  }

  static async deactivateEmployee(id: string): Promise<boolean> {
    try {
      await EmployeeApi.deactivateEmployee(id);
      return true;
    } catch (error) {
      console.error('Deactivate Employee Exception:', error);
      return false;
    }
  }

}
