import { EmployeesEntity } from "../../../data";
import { RegisterEmployeesDto } from "../../dto/auth/employees/register-employees.dto";

export abstract class AuthEmployeesRepository {
    abstract register(registerEmployeesDto:RegisterEmployeesDto): Promise<{ message: string }>
    abstract login(email: string, password: string): Promise<{ token: string, message: string }>;
}