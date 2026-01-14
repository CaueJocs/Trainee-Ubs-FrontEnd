import { DepartmentApi } from "@/api/DepartmentApi";
import type { DepartmentDetailedResponse, DepartmentResponse, UpdateDepartmentRequest } from "@/interfaces/Department";

export class DepartmentService {

  static async getDepartments(): Promise<DepartmentResponse[]> {
    try {
      const response = await DepartmentApi.getAllDepartments();
      return response;
    } catch (error) {
      console.error('Get Departments Exception:', error);
      return [];
    }
  }

  static async renameDepartment(currentName: string, newName: string): Promise<boolean> {
    try {
      await DepartmentApi.renameDepartment(currentName, newName);
      return true;
    } catch (error) {
      console.error('Rename Department Exception:', error);
      return false;
    }
  }

  static async createDepartment(name: string, currency: string): Promise<DepartmentResponse | null> {
    try {
      const response = await DepartmentApi.createDepartment(name, currency);
      return response;
    } catch (error) {
      console.error('Create Department Exception:', error);
      return null;
    }
  }

  static async deleteDepartment(name: string): Promise<boolean> {
    try {
      await DepartmentApi.deleteDepartment(name);
      return true;
    } catch (error) {
      console.error('Delete Department Exception:', error);
      return false;
    }
  }

  static async updateDepartment(name: string, data: UpdateDepartmentRequest): Promise<DepartmentDetailedResponse | null> {
    try {
      const response = await DepartmentApi.updateDepartment(name, data);
      return response;
    } catch (error) {
      console.error('Update Department Exception:', error);
      return null;
    }
  }

}
