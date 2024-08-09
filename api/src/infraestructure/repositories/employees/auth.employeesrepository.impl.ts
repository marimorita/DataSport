import { EmployeesEntity } from "../../../data";
import { AuthEmployeesDataSource, AuthEmployeesRepository, RegisterEmployeesDto } from "../../../domain";
export class AuthEmployeesRepositoryImpl implements AuthEmployeesRepository {

    constructor(
        private readonly authEmployeesDataSource: AuthEmployeesDataSource,
    ){}

    register(registerEmployeesDto: RegisterEmployeesDto): Promise<{ message: string }> {
        return this.authEmployeesDataSource.register(registerEmployeesDto);
    }

    login(email: string, password: string): Promise<{ token: string, role: string | undefined, message: string }> {
        return this.authEmployeesDataSource.login(email, password);
    }

    getEmployeeById(id: number): Promise<EmployeesEntity | null> {
        return this.authEmployeesDataSource.getEmployeeById(id);
    }

    getEmployeeByEmail(email: string): Promise<EmployeesEntity | null> {
        return this.authEmployeesDataSource.getEmployeeByEmail(email); // Implementa esta lógica en el DataSource
    }

}