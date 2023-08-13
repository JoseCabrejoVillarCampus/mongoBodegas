import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareBodegasVerify, appDTODataBodegas, appDTOParamBodegas} from '../middleware/bodegasmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Bodegas } from '../dtocontroller/bodegasdto.js';
let storageBodegas = Router();

let db = await coneccion();
let bodegas = db.collection("bodegas");

storageBodegas.get('/:id?', limitGet(), appMiddlewareBodegasVerify ,async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await bodegas.find({}).toArray()
    : await bodegas.find({ "id_responsable": parseInt(req.params.id)}).toArray();
    res.send(result)
});

storageBodegas.post('/', limitGet(), appMiddlewareBodegasVerify, appDTODataBodegas , async(req, res) => {
    if(!req.rateLimit) return;
    try{
        let result = await bodegas.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Bodegas);

        res.send(err);
    }
});
storageBodegas.put("/:id?", limitGet(), appMiddlewareBodegasVerify, appDTODataBodegas , appDTOParamBodegas, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la bodega a modificar."})
    }else{
        try{
            let result = await bodegas.updateOne(
                { "id_responsable": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageBodegas.delete("/:id?", limitGet(), appMiddlewareBodegasVerify, appDTOParamBodegas, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la bodega a eliminar."})
    } else {
        try{
            let result = await bodegas.deleteOne(
                { "id_responsable": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageBodegas;