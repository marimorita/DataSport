import { RegisterAdministratorDto } from "../../dto/auth/administrator/register-administrator.dto";
import { AdministratorEntity } from "../../../data";

export abstract class AuthAdministratorRepository {
    abstract register(registerAdministratorDto:RegisterAdministratorDto): Promise<{ message: string }>
    abstract login(email: string, password: string): Promise<{ token: string, message: string }>;
}