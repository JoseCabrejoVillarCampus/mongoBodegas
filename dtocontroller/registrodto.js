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
export class Registro {
    constructor(data) {
        Object.assign(this, data);
        this.id_bodega = 0;
        this.id_producto = "";
        this.cantidad = 0;
        this.created_by = 0;
    }
}
__decorate([
    Expose({ name: 'BodegaID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro storeID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Registro.prototype, "id_bodega", void 0);
__decorate([
    Expose({ name: 'ProductoID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro creationDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro creationDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Registro.prototype, "id_producto", void 0);
__decorate([
    Expose({ name: 'Disponibles' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro amount es obligatorio` }; } }),
    __metadata("design:type", Number)
], Registro.prototype, "cantidad", void 0);
__decorate([
    Expose({ name: 'userCreator' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro userCreator es obligatorio` }; } }),
    __metadata("design:type", Number)
], Registro.prototype, "created_by", void 0);
;
