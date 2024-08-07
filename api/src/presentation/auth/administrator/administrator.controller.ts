import { Request, Response } from "express";
import { RegisterAdministratorDto, AuthAdministratorRepository, CustomError  } from "../../../domain";
import { AdministratorEntity } from "../../../data";
export class AuthAdministratorController {
    
    constructor(
        private readonly authAdministratorRepository: AuthAdministratorRepository
    ){}

    private handleError = ( error: unknown, res: Response ) => {
    
         if ( error instanceof CustomError ) {
           return res.status(error.statusCode).json({ error: error.message });
         }
    
         return res.status(500).json({ error: 'Internal Server Error' });
       }

    registerAdministrator = async (req: Request, res: Response) => {
       const [error, registerAdministratorDto] = RegisterAdministratorDto.create(req.body);
       if ( error ) return res.status(400).json({ error });
       
       try {
        await this.authAdministratorRepository.register(registerAdministratorDto!)
        res.status(201).json({ message: 'Registro exitoso!' });
       } catch (error) {
        this.handleError(error, res);
       }
    }

    loginAdministrator = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        if (!email ||!password) {
            return res.status(400).json({ error: 'Email and password are required'})
        }

        try {
            const { token, message } = await this.authAdministratorRepository.login(email, password)
            res.json({ token, message })
        } catch (error) {
            this.handleError(error, res)
        }
    }
}