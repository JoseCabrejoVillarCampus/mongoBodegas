import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Inventarios {

    @Expose({ name: 'storeID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro storeID es obligatorio` } } })
    id_bodega: number;

    @Expose({ name: 'productID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro productID es obligatorio` } } })
    id_producto: number;

    @Expose({ name: 'amount' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro amount es obligatorio` } } })
    cantidad: number;

    @Expose({ name: 'userCreator' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro userCreator es obligatorio` } } })
    created_by: number;

    @Expose({ name: 'userUpdater' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro userUpdater es obligatorio` } } })
    update_by: number;

    @Expose({ name: 'creationDate' }) 
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro creationDate debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro creationDate es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    created_at: string;

    @Expose({ name: 'updateDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro updateDate debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro updateDate es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    update_at: string;

    @Expose({ name: 'deleteDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro deleteDate debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro deleteDate es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    deleted_at: string;

    constructor(data: Partial<Inventarios>) {
        Object.assign(this, data);
        this.id_bodega = 0;
        this.id_producto = 0;
        this.cantidad = 0 ;
        this.created_by = 0;
        this.update_by = 0;
        this.created_at = "1991-01-01" ;
        this.update_at = "1991-01-01";
        this.deleted_at = "1991-01-01";
        
    }
};