import { ClientsEntity } from "../../../data";
import { CustomError } from "../../../domain";

export class ClientMapper {
    public static toDomain(object: any): ClientsEntity {
        const { id, name, lastName, email, phone, assistance, address, state, img, idCenter } = object;

        if (!id) {
            throw CustomError.badRequest("Falta id");
        }

        if (!name) throw CustomError.badRequest("Falta");
        if (!lastName) throw CustomError.badRequest("Falta Apellido");
        if (!email) throw CustomError.badRequest("Falta Correo");
        if (!phone) throw CustomError.badRequest("Falta Telefono");
        if (!assistance) throw CustomError.badRequest("Falta Asistencia");
        if (!address) throw CustomError.badRequest("Falta direccion");
        // if (!img) throw CustomError.badRequest("Falta Imagen");
        if (!idCenter) throw CustomError.badRequest("Falta id de Centro");

        return {
            id,
            name,
            lastName,
            email,
            phone,
            assistance,
            address,
            state,
            // img,
            idCenter,
        };
    }

    public static toPersistence(entity: ClientsEntity): any {
        return {
            id: entity.id,
            name: entity.name,
            lastName: entity.lastName,
            email: entity.email,
            phone: entity.phone,
            assistance: entity.assistance,
            address: entity.address,
            state: entity.state,
            // img: entity.img,
            idCenter: entity.idCenter,
        };
    }
}