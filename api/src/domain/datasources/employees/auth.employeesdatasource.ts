import { EmployeesEntity } from "../../../data";
import { RegisterEmployeesDto } from "../../dto/auth/employees/register-employees.dto";

export abstract class AuthEmployeesDataSource {
    abstract register(registerEmployeesDto:RegisterEmployeesDto): Promise<{ message: string }>
    abstract login(email: string, password: string): Promise<{ token: string, role: string | undefined, message: string  }>;

    abstract getEmployeeById(id: number): Promise<EmployeesEntity | null>;
    abstract getEmployeeByEmail(email: string): Promise<EmployeesEntity | null>;
}