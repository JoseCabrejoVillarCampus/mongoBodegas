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
export class Users {
    constructor(data) {
        Object.assign(this, data);
        this._id = "";
        this.nombre = "";
        this.email = "";
        this.email_verified_at = "1991-01-01";
        this.estado = 0;
        this.created_by = 0;
        this.update_by = 0;
        this.foto = "";
        this.password = "";
        this.created_at = "1991-01-01";
        this.update_at = "1991-01-01";
        this.deleted_at = "1991-01-01";
    }
}
__decorate([
    Expose({ name: 'id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro id es obligatorio` }; } }),
    __metadata("design:type", String)
], Users.prototype, "_id", void 0);
__decorate([
    Expose({ name: 'name' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro name es obligatorio` }; } }),
    __metadata("design:type", String)
], Users.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'correElectronico' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro correElectronico es obligatorio` }; } }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    Expose({ name: 'fecha_verificacion' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fecha_verificacion es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Users.prototype, "email_verified_at", void 0);
__decorate([
    Expose({ name: 'state' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro state es obligatorio` }; } }),
    __metadata("design:type", Number)
], Users.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'userCreator' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro userCreator es obligatorio` }; } }),
    __metadata("design:type", Number)
], Users.prototype, "created_by", void 0);
__decorate([
    Expose({ name: 'userUpdater' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro userUpdater es obligatorio` }; } }),
    __metadata("design:type", Number)
], Users.prototype, "update_by", void 0);
__decorate([
    Expose({ name: 'imagen' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    __metadata("design:type", String)
], Users.prototype, "foto", void 0);
__decorate([
    Expose({ name: 'accesscode' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro accesscode es obligatorio` }; } }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    Expose({ name: 'creationDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro creationDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro creationDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Users.prototype, "created_at", void 0);
__decorate([
    Expose({ name: 'updateDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro updateDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro updateDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Users.prototype, "update_at", void 0);
__decorate([
    Expose({ name: 'deleteDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro deleteDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro deleteDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Users.prototype, "deleted_at", void 0);
;
