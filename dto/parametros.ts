import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class Parametros {
    @IsString()
    @Expose({name: "id"})
    @Transform(({value}) => {
        if (/^[a-z0-9]+$/.test(value)) 
            return value;
        else 
            throw {status: 400, message: "El dato del parámetro id ingresado es incorrecto, ingresa una cadena de letras minúsculas y/o números"};
    }, {toClassOnly: true})
    id: string;

    constructor(data: Partial<Parametros>) {
        Object.assign(this, data);
        this.id = "";
    }
}
