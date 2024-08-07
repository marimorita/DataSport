import { Repository } from "typeorm";
import { AppDataSource } from "../../../data/mysql/ormconfig";
import { BcryptAdapter } from "../../../config";
import { AuthEmployeesDataSource, CustomError, RegisterEmployeesDto} from "../../../domain";
import { EmployeesMapper } from "../../mappers/employees/employees.mappers";
import { EmployeesEntity } from "../../../data";
import { envs } from '../../../config';
import jwt from 'jsonwebtoken';

export class AuthEmployeesDataSourceImpl implements AuthEmployeesDataSource {
    private readonly employeesRepository: Repository<EmployeesEntity>;

    constructor() {
        this.employeesRepository = AppDataSource.getRepository(EmployeesEntity);
    }
    
    private createEmployeeData(payload: { [key: string]: any }): RegisterEmployeesDto {
        // Puedes crear el DTO aquí sin exponer datos
        const [error, dto] = RegisterEmployeesDto.create(payload);
        if (error) throw CustomError.badRequest(error);
        return dto!;
    }

    async register(payload: { [key: string]: any }): Promise<{ message: string }> {
        const dto = this.createEmployeeData(payload);
        const { id, name, email, phone, address, password, img, role, idCenter } = dto;
        const hashedPassword = BcryptAdapter.hash(password);

        try {
            const existingEmployee = await this.employeesRepository.findOne({ where: { email } });
            if (existingEmployee) throw CustomError.badRequest("Este empleado ya existe");

            const newEmployee = this.employeesRepository.create({
                id,
                name,
                email,
                phone,
                address,
                password: hashedPassword,
                img,
                role,
                idCenter,
            });

            await this.employeesRepository.save(newEmployee);

            return { message: "Registro exitoso" }; 

        } catch (error) {
            console.error("Error registering employee:", error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async login(email:string, password: string): Promise<{ token: string, message: string }> {
        try {
            const employees = await this.employeesRepository.findOne({ where: { email }});
            if (!employees) throw CustomError.badRequest("Correo invalido");

            if (!employees.password) throw CustomError.unauthorized("Contraseña Invalida");
            
            const isPasswordValid = BcryptAdapter.compare(password, employees.password);
            if (!isPasswordValid) throw CustomError.unauthorized("Contraseña Invalida");

            const token = jwt.sign({ user: {email: employees.email, role: employees.role}}, envs.JWT_SECRET, {expiresIn: '1h',});

            return {
                token,
                message: "Inicio de sesion exitoso"
            };
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

}