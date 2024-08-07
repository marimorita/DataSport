import { Validators } from '../../../../config'

export class RegisterEmployeesDto {
    private constructor(
        
        public id: number,   
        public name: string,   
        public email: string,
        public phone: number,
        public address: string,
        public password: string,
        public img: string,
        public role: string,
        public idCenter: number,
    ){}

        static create( object: {[ key: string]: any;}): [ string?, RegisterEmployeesDto?] {

            const { id, name, email, password, address, phone, img, role, idCenter  } = object;

            if ( !id ) return [ 'Falta la Cedula' ];
            if ( !Validators.number.test( id ) ) return [ 'Solo caracteres numericos en Cedula'];
            if ( !name ) return [ 'Falta el Nombre' ];
            if ( !Validators.text.test( name ) ) return [ 'Nombre no valido'];
            if ( !email ) return [ 'Falta el Correo' ];
            if ( !Validators.email.test( email ) ) return [ 'Correo no valido'];
            if ( !phone ) return [ 'Falta el Numero telefonico' ];
            if ( phone.length < 10 ) return [ 'Numero telefonico muy corto' ];
            if ( !Validators.number.test( phone ) ) return [ 'Solo caracteres numericos en numero telefonico'];
            if ( !role ) return [ 'Falta el Rol' ];
            if ( !Validators.text.test( role ) ) return [ 'Rol no valido'];
            if ( !img ) return [ 'Falta la Imagen' ];
            if ( !idCenter ) return [ 'Falta el id del Centro' ];
            if ( !Validators.number.test( idCenter ) ) return [ 'Solo caracteres numericos en id centro'];
            if ( !address ) return [ 'Falta la direccion' ];
            if ( !password ) return [ 'Falta la contraseña' ];
            if ( password.length < 6 ) return [ 'Contraseña muy corta' ];
            
            return [
                undefined,
                new RegisterEmployeesDto(id, name, email, phone, address, password, img, role, idCenter)
            ];
        }
}