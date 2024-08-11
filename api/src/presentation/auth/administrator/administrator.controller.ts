import { Request, Response } from "express";
import { RegisterAdministratorDto, AuthAdministratorRepository, CustomError } from "../../../domain";
import { AdministratorEntity } from "../../../data";
import jwt from 'jsonwebtoken';
import { envs } from "../../../config";
import crypto from 'crypto';

function generateVerificationCode(): string {
    
    const letters = Array(4)
        .fill(null)
        .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
        .join('');

    
    const numbers = Array(4)
        .fill(null)
        .map(() => Math.floor(Math.random() * 10))
        .join('');

    
    return `${letters}${numbers}`;
}
export class AuthAdministratorController {

    constructor(
        private readonly authAdministratorRepository: AuthAdministratorRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerAdministrator = async (req: Request, res: Response) => {
        const [error, registerAdministratorDto] = RegisterAdministratorDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authAdministratorRepository.register(registerAdministratorDto!)
            res.status(201).json({ message: 'Registro exitoso!' });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    loginAdministrator = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        const routeCode = generateVerificationCode();

        try {
            const { token, role, message } = await this.authAdministratorRepository.login(email, password)
            res.json({ token, role, routeCode, message })
        } catch (error) {
            this.handleError(error, res)
        }
    }

    getAdministratorById = async (req: Request, res: Response) => {
        const token = req.params.token;
        console.log("Token recibido:", token);

        if (!token) {
            return res.status(400).json({ error: 'Token requerido' });
        }

        try {
            // Verifica el token
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as { user: { email: string, role: string } };
            console.log("Email decodificado:", decoded.user.email);
            // Obtiene el administrador basado en el email decodificado
            const admin = await this.authAdministratorRepository.getAdministratorByEmail(decoded.user.email);
            console.log("Administrador encontrado:", admin);
            if (!admin) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }

            res.status(200).json(admin);
        } catch (error) {
            console.log(error);

            this.handleError(error, res);
        }
    }

}