import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareInventariosVerify, appDTODataInventarios, appDTOParamInventarios} from '../middleware/inventariosmidddleware.js';
import { processErrors } from '../common/Function.js';
import { Inventarios } from '../dtocontroller/inventariosdto.js';
let storageInventarios = Router();

let db = await coneccion();
let inventarios = db.collection("inventarios");

storageInventarios.get('/:id?', limitGet(), appMiddlewareInventariosVerify ,async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await inventarios.find({}).toArray()
    : await inventarios.find({ "id_bodega": parseInt(req.params.id)}).toArray();
    res.send(result)
});

storageInventarios.post('/', limitGet(), appMiddlewareInventariosVerify, appDTODataInventarios , async(req, res) => {
    if(!req.rateLimit) return;
    try{
        let result = await inventarios.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Inventarios);

        res.send(err);
    }
});
storageInventarios.put("/:id?", limitGet(), appMiddlewareInventariosVerify, appDTODataInventarios , appDTOParamInventarios, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la bodega cuyo inventario desea modificar."})
    }else{
        try{
            let result = await inventarios.updateOne(
                { "id_bodega": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageInventarios.delete("/:id?", limitGet(), appMiddlewareInventariosVerify, appDTOParamInventarios, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la bodega cuyo inventario desea eliminar."})
    } else {
        try{
            let result = await inventarios.deleteOne(
                { "id_bodega": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageInventarios;