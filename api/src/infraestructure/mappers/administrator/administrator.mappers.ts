import { AdministratorEntity } from "../../../data";
import { CustomError } from "../../../domain";

export class AdministratorMapper {
    public static toDomain(object: any): AdministratorEntity {
        const { id, name, email, phone, password, address, img, role, idCenter } = object;

        if (!id) throw CustomError.badRequest("Falta Cedula");
        if (!name) throw CustomError.badRequest("Falta Nombre");
        if (!email) throw CustomError.badRequest("Falta Correo");
        if (!phone) throw CustomError.badRequest("Falta Telefono");
        if (!password) throw CustomError.badRequest("Falta Contraseña");
        if (!address) throw CustomError.badRequest("Falta Direccion");
        // if (!img) throw CustomError.badRequest("Falta Imagen");
        if (!role) throw CustomError.badRequest("Falta Rol");
        if (!idCenter) throw CustomError.badRequest("Faltaid del Centro");

        return {
            id,
            name,
            email,
            phone,
            password,
            address,
            role,
            idCenter,
        };
    }

    public static toPersistence(entity: AdministratorEntity): any {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phone: entity.phone,
            password: entity.password,
            address: entity.address,
            role: entity.role,
            idCenter: entity.idCenter,
        };
    }
}