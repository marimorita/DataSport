import { Request, Response } from "express";
import { RegisterEmployeesDto, AuthEmployeesRepository, CustomError } from "../../../domain";
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
            const { token, message } = await this.authEmployeesRepository.login(email, password)
            res.json({ token, message })
        } catch (error) {
            this.handleError(error, res)
        }
    }
}