import type { Role } from "@/enums/Role";

export interface EmployeeResponse {
    id: string;
    name: string;
    email: string;
    departmentName: string;
    role: Role;
    position: string;
    managerId: string;
    active: boolean;
}

export interface EmployeeRequest {
    name: string;
    email: string;
    password: string;
    departmentName: string;
    position: string;
    managerId: string;
    role: Role;
    active: boolean;
}
