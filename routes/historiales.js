import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareHistorialesVerify, appDTODataHistoriales, appDTOParamHistoriales} from '../middleware/historialesmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Historiales } from '../dtocontroller/historialesdto.js';
let storageHistoriales = Router();

let db = await coneccion();
let historiales = db.collection("historiales");

storageHistoriales.get('/:id?', limitGet(), appMiddlewareHistorialesVerify ,async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await historiales.find({}).toArray()
    : await historiales.find({ "id_bodega_origen": parseInt(req.params.id)}).toArray();
    res.send(result)
});

storageHistoriales.post('/', limitGet(), appMiddlewareHistorialesVerify, appDTODataHistoriales , async(req, res) => {
    if(!req.rateLimit) return;
    try{
        let result = await historiales.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Historiales);

        res.send(err);
    }
});
storageHistoriales.put("/:id?", limitGet(), appMiddlewareHistorialesVerify, appDTODataHistoriales , appDTOParamHistoriales, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la bodega de origen cuyo historial desea modificar."})
    }else{
        try{
            let result = await historiales.updateOne(
                { "id_bodega_origen": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageHistoriales.delete("/:id?", limitGet(), appMiddlewareHistorialesVerify, appDTOParamHistoriales, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la bodega de origen cuyo historial desea eliminar."})
    } else {
        try{
            let result = await historiales.deleteOne(
                { "id_bodega_origen": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageHistoriales;