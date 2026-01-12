import { DepartmentApi } from "@/api/DepartmentApi";
import type { DepartmentResponse } from "@/interfaces/Department";

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

}
