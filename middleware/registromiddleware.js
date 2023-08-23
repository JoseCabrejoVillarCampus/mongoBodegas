import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import {Registro} from '../dtocontroller/registrodto.js'
import {Parametros} from '../dtocontroller/parametros.js'
import { Router } from "express";
import { validate } from 'class-validator';
const appMiddlewareRegistroVerify = Router();
const appDTODataRegistro = Router();;

appMiddlewareRegistroVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(Registro, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    console.log(payload);
    console.log(clone);
    req.data= undefined;
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});
appDTODataRegistro.use( async(req,res,next)=>{
    try {
        let data = plainToClass(Registro, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});

export { 
    appMiddlewareRegistroVerify,
    appDTODataRegistro,    
};