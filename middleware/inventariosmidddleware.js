import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {Parametros} from '../dtocontroller/parametros.js'
import { Router } from "express";
import { validate } from 'class-validator';
const appMiddlewareInventariosVerify = Router();
const appDTODataInventarios = Router();
const appDTOParamInventarios = Router();

appMiddlewareInventariosVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(DTO("inventarios").class, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    console.log(payload);
    console.log(clone);
    req.data= undefined;
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});
appDTODataInventarios.use( async(req,res,next)=>{
    try {
        let data = plainToClass(DTO("inventarios").class, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});
appDTOParamInventarios.use("/:id", async (req, res, next)=>{
    try{
        let parametro = plainToClass(Parametros, req.params);
        await validate(parametro);
        next();
    }catch (error){
        res.status(error.status).send(error);
    }
});
export { 
    appMiddlewareInventariosVerify,
    appDTODataInventarios,
    appDTOParamInventarios    
};