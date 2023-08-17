var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';
export class Parametros {
    constructor(data) {
        Object.assign(this, data);
        this.id = "";
    }
}
__decorate([
    IsString(),
    Expose({ name: "id" }),
    Transform(({ value }) => {
        if (/^[a-z0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El dato del parámetro id ingresado es incorrecto, ingresa una cadena de letras minúsculas y/o números" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Parametros.prototype, "id", void 0);
