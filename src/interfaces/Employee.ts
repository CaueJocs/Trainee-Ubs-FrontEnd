import type { Role } from "@/enums/Role";

export interface EmployeeResponse {
    id: string;
    name: string;
    email: string;
    departmentName: string;
    role: Role;
    active: boolean;
}

export interface EmployeeRequest {
    name: string;
    email: string;
    managerId: string;
    password: string;
    departmentId: string;
    position: string;
    role: Role;
}
