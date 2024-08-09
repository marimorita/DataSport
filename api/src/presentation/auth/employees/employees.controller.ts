import { Request, Response } from "express";
import { RegisterEmployeesDto, AuthEmployeesRepository, CustomError } from "../../../domain";
import jwt from 'jsonwebtoken';
import { envs } from "../../../config";
export class AuthEmployeesController {

    constructor(
        private readonly authEmployeesRepository: AuthEmployeesRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Error del servidor' });
    }

    registerEmployees = async (req: Request, res: Response) => {
        const [error, registerEmployeesDto] = RegisterEmployeesDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authEmployeesRepository.register(registerEmployeesDto!)
            res.status(201).json({ message: 'Registro exitoso!' });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    loginEmployees = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Correo y contraseña requeridos' })
        }

        try {
            const { token, role, message } = await this.authEmployeesRepository.login(email, password)
            res.json({ token, role, message })
        } catch (error) {
            this.handleError(error, res)
        }
    }

    getEmployeeById = async (req: Request, res: Response) => {
        const { id } = req.params;

        // Convertir el ID de string a number
        const employeeId = parseInt(id, 10);

        if (isNaN(employeeId)) {
            return res.status(400).json({ error: 'Formato de id invalido' });
        }

        try {
            const employee = await this.authEmployeesRepository.getEmployeeById(employeeId);
            if (!employee) {
                return res.status(404).json({ error: 'Este empleado no existe' });
            }
            res.json(employee);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    getEmployeeByToken = async (req: Request, res: Response) => {
        const token = req.params.token;

        if (!token) {
            return res.status(400).json({ error: 'Token requerido' });
        }

        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as { user: { email: string, role: string } };
            
            const employee = await this.authEmployeesRepository.getEmployeeByEmail(decoded.user.email);

            if (!employee) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }

            res.status(200).json(employee);
        } catch (error) {
            console.log(error);
            
            this.handleError(error, res);
        }
    }
}