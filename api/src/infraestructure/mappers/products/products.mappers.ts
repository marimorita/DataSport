import { ProductsEntity } from "../../../data";
import { CustomError } from "../../../domain";

export class ProductsMapper {
    public static toDomain(object: any): ProductsEntity {
        const { id, name, description, stock, price, idCenter } = object;

        if (!id) {
            throw CustomError.badRequest("Missing id");
        }

        if (!name) throw CustomError.badRequest("Missing name");
        if (!description) throw CustomError.badRequest("Missing description");
        if (!stock) throw CustomError.badRequest("Missing stock")
        if (!price) throw CustomError.badRequest("Missing price");
        if (!idCenter) throw CustomError.badRequest("Missing idCenter");

        return {
            id,
            name,
            description,
            stock,
            price,
            idCenter,
        };
    }

    public static toPersistence(entity: ProductsEntity): any {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            stock: entity.stock,
            price: entity.price,
            idCenter: entity.idCenter,
        };
    }
}