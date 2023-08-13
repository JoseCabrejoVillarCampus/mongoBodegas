import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Historiales {

    @Expose({ name: 'amount' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro amount es obligatorio` } } })
    cantidad: number;

    @Expose({ name: 'originStoreId' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro originStoreId es obligatorio` } } })
    id_bodega_origen: number;

    @Expose({ name: 'destinationStoreId' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro destinationStoreId es obligatorio` } } })
    id_bodega_destino: number;

    @Expose({ name: 'inventoryId' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro inventoryId es obligatorio` } } })
    id_inventario: number;

    @Expose({ name: 'state' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro state es obligatorio` } } })
    estado: number;

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

    constructor(data: Partial<Historiales>) {
        Object.assign(this, data);
        this.cantidad = 0;
        this.id_bodega_origen = 0;
        this.id_bodega_destino = 0;
        this.id_inventario = 0;
        this.estado = 0 ;
        this.created_by = 0;
        this.update_by = 0;
        this.created_at = "1991-01-01" ;
        this.update_at = "1991-01-01";
        this.deleted_at = "1991-01-01";
        
    }
};