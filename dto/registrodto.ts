import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Registro {

    @Expose({ name: 'BodegaID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro storeID es obligatorio` } } })
    id_bodega: number;

    @Expose({ name: 'ProductoID' }) 
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro creationDate debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro creationDate es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    id_producto: string;

    @Expose({ name: 'Disponibles' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro amount es obligatorio` } } })
    cantidad: number;

    @Expose({ name: 'userCreator' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro userCreator es obligatorio` } } })
    created_by: number;

    

    constructor(data: Partial<Registro>) {
        Object.assign(this, data);
        this.id_bodega = 0;
        this.id_producto = "";
        this.cantidad = 0 ;
        this.created_by = 0;
        
    }
};