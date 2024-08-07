
export class RegisterProductsDto {
    private constructor(
        
        public name: string, 
        public description: string,
        public stock: number,
        public price: number,
        public idCenter: number,
    ){}

        static create( object: {[ key: string]: any;}): [ string?, RegisterProductsDto?] {

            const { name, description, stock, price, idCenter } = object;

            if ( !name ) return [ 'Missing name' ];
            if ( !description ) return [ 'Missing description' ];
            if ( !stock ) return [ 'Missing stock' ];
            if ( !price ) return [ 'Missing price' ];
            if ( !idCenter ) return [ 'Missing idCenter' ];
            
            return [
                undefined,
                new RegisterProductsDto(name, description, stock, price, idCenter)
            ];
        }
}