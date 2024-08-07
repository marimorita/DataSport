import { Router } from "express";
import { AuthEmployeesController } from "./employees.controller";
import { AuthEmployeesDataSourceImpl, AuthEmployeesRepositoryImpl } from "../../../infraestructure";
import { authenticateToken, authorizeRoles } from "../../../config";


export class AuthEmployeesRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new AuthEmployeesDataSourceImpl();
        const AuthRepository = new AuthEmployeesRepositoryImpl(datasource); 
        const controller = new AuthEmployeesController(AuthRepository);

        router.post('/login', controller.loginEmployees);
        router.post('/register', authenticateToken, authorizeRoles(['admin']), controller.registerEmployees)

        return router;
    }
}