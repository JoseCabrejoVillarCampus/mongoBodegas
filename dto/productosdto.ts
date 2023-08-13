import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Productos {

    @Expose({ name: 'name' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro name es obligatorio` } } })
    nombre: string;

    @Expose({ name: 'about' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro about es obligatorio` } } })
    descripcion: string;

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

    constructor(data: Partial<Productos>) {
        Object.assign(this, data);
        this.nombre = "";
        this.descripcion = "";
        this.estado = 0 ;
        this.created_by = 0;
        this.update_by = 0;
        this.created_at = "1991-01-01" ;
        this.update_at = "1991-01-01";
        this.deleted_at = "1991-01-01";
        
    }
};