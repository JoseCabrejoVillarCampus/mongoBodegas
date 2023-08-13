var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Productos {
    constructor(data) {
        Object.assign(this, data);
        this.nombre = "";
        this.descripcion = "";
        this.estado = 0;
        this.created_by = 0;
        this.update_by = 0;
        this.created_at = "1991-01-01";
        this.update_at = "1991-01-01";
        this.deleted_at = "1991-01-01";
    }
}
__decorate([
    Expose({ name: 'name' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro name es obligatorio` }; } }),
    __metadata("design:type", String)
], Productos.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'about' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro about es obligatorio` }; } }),
    __metadata("design:type", String)
], Productos.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: 'state' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro state es obligatorio` }; } }),
    __metadata("design:type", Number)
], Productos.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'userCreator' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro userCreator es obligatorio` }; } }),
    __metadata("design:type", Number)
], Productos.prototype, "created_by", void 0);
__decorate([
    Expose({ name: 'userUpdater' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro userUpdater es obligatorio` }; } }),
    __metadata("design:type", Number)
], Productos.prototype, "update_by", void 0);
__decorate([
    Expose({ name: 'creationDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro creationDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro creationDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Productos.prototype, "created_at", void 0);
__decorate([
    Expose({ name: 'updateDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro updateDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro updateDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Productos.prototype, "update_at", void 0);
__decorate([
    Expose({ name: 'deleteDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro deleteDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro deleteDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Productos.prototype, "deleted_at", void 0);
;
