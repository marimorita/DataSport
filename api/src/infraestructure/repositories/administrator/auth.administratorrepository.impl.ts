import { AdministratorEntity } from "../../../data";
import { AuthAdministratorDataSource, AuthAdministratorRepository, RegisterAdministratorDto } from "../../../domain";
export class AuthAdministratorRepositoryImpl implements AuthAdministratorRepository {

    constructor(
        private readonly authAdministratorDataSource: AuthAdministratorDataSource,
    ){}

    register(registerAdministratorDto: RegisterAdministratorDto): Promise<{ message: string }> {
        return this.authAdministratorDataSource.register(registerAdministratorDto);
    }

    login(email: string, password: string): Promise<{ token: string, role: string | undefined, message: string }> {
        return this.authAdministratorDataSource.login(email, password);
    }

    getAdministratorByEmail(email: string): Promise<AdministratorEntity | null> {
        return this.authAdministratorDataSource.getAdministratorByEmail(email); // Implementa esta lógica en el DataSource
    }
}