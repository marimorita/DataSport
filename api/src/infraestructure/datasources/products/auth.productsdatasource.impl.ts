import { Repository } from "typeorm";
import { AppDataSource } from "../../../data/mysql/ormconfig";
import { AuthProductsDataSource, CustomError, RegisterProductsDto} from "../../../domain";
import { ProductsMapper } from "../../mappers/products/products.mappers";
import { ProductsEntity } from "../../../data";
// import { envs } from '../../../config';
// import jwt from 'jsonwebtoken';
// import { BcryptAdapter } from "../../../config";

export class AuthProductsDataSourceImpl implements AuthProductsDataSource {
    private readonly productsRepository: Repository<ProductsEntity>;

    constructor() {
        this.productsRepository = AppDataSource.getRepository(ProductsEntity);
    }
    
    async register(registerProductsDto: RegisterProductsDto): Promise<ProductsEntity> {
        const { name, description, stock, price, idCenter} = registerProductsDto
        
        try {

            const existingProducts = await this.productsRepository.findOne({ where: { name } });
            if (existingProducts) throw CustomError.badRequest("User already exists")

            const newProducts = this.productsRepository.create({
                name: name,
                description: description,
                stock: stock,
                price: price,
                idCenter: idCenter,
            });
           
            await this.productsRepository.save(newProducts);

            return ProductsMapper.toDomain(newProducts);
            
        } catch (error) {
            // console.error("Error registering client:", error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    // async login(email:string, password: string): Promise<{ token: string, message: string }> {
    //     try {
    //         const client = await this.establishmentRepository.findOne({ where: { email }});
    //         if (!client) throw CustomError.badRequest("Invalid crendetials");

    //         if (!client.password) throw CustomError.unauthorized("Invalid credentials");
            
    //         const isPasswordValid = BcryptAdapter.compare(password, client.password);
    //         if (!isPasswordValid) throw CustomError.unauthorized("Invalid crendetials");

    //         const token = jwt.sign({ id: client.id, email: client.email}, envs.JWT_SECRET,{
    //             expiresIn: '1h',
    //         });

    //         return {
    //             token,
    //             message: "Login successful"
    //         };
    //     } catch (error) {
    //         if (error instanceof CustomError) {
    //             throw error;
    //         }
    //         throw CustomError.internalServer();
    //     }
    // }

}