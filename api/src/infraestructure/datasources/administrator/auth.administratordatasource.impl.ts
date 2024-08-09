import { Repository } from "typeorm";
import { AppDataSource } from "../../../data/mysql/ormconfig";
import { BcryptAdapter } from "../../../config";
import { AuthAdministratorDataSource, CustomError, RegisterAdministratorDto} from "../../../domain";
import { AdministratorMapper } from "../../mappers/administrator/administrator.mappers";
import { AdministratorEntity } from "../../../data";
import { envs } from '../../../config';
import jwt from 'jsonwebtoken';

export class AuthAdministratorDataSourceImpl implements AuthAdministratorDataSource {
    private readonly administratorRepository: Repository<AdministratorEntity>;

    constructor() {
        this.administratorRepository = AppDataSource.getRepository(AdministratorEntity);
    }
    
    async register(registerAdministratorDto: RegisterAdministratorDto): Promise<{message: string}> {
        const { id, name, email, phone, address, password, role, idCenter} = registerAdministratorDto;

        const hashedPassword = BcryptAdapter.hash(password);
        
        try {

            const existingAdministrator = await this.administratorRepository.findOne({ where: { email } });
            if (existingAdministrator) throw CustomError.badRequest("Este administrador ya existe")

            const newAdministrator = this.administratorRepository.create({
                id: id,
                name: name,
                email: email,
                phone: phone,
                address: address,
                password: hashedPassword,
                role: role,
                idCenter: idCenter,
            });
           
            await this.administratorRepository.save(newAdministrator);

            return { message: "Registro exitoso" }; 
            
        } catch (error) {
            console.error("Error registering client:", error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async login(email:string, password: string): Promise<{ token: string, role: string | undefined, message: string }> {
        try {
            const admin = await this.administratorRepository.findOne({ where: { email }});
            if (!admin) throw CustomError.badRequest("Correo Invalido");

            if (!admin.password) throw CustomError.unauthorized("Contraseña Invalida");
            
            const isPasswordValid = BcryptAdapter.compare(password, admin.password);
            if (!isPasswordValid) throw CustomError.unauthorized("Contraseña Invalida");

            const token = jwt.sign({ user: {email: admin.email, role: admin.role}}, envs.JWT_SECRET, {expiresIn: '1h',});

            return {
                token,
                role: admin.role,
                message: "Inicio de sesion exitoso"
            };
        } catch (error) {
            console.error("Error registering client:", error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getAdministratorByEmail(email: string): Promise<AdministratorEntity | null> {
        // Implementación para obtener el administrador por su email
        // Ejemplo usando TypeORM:
        const admin = await this.administratorRepository.findOne({ where: { email } });
        return admin || null;
    }
}