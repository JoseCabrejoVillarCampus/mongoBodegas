import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareProductosVerify, appDTODataProductos, appDTOParamProductos} from '../middleware/productosmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Productos } from '../dtocontroller/productosdto.js';
let storageProductos = Router();

let db = await coneccion();
let productos = db.collection("productos");

storageProductos.get('/:id?', limitGet(), appMiddlewareProductosVerify ,async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await productos.find({}).toArray()
    : await productos.find({ "id_responsable": parseInt(req.params.id)}).toArray();
    res.send(result)
});

storageProductos.post('/', limitGet(), appMiddlewareProductosVerify, appDTODataProductos , async(req, res) => {
    if(!req.rateLimit) return;
    try{
        let result = await productos.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Productos);

        res.send(err);
    }
});
storageProductos.put("/:id?", limitGet(), appMiddlewareProductosVerify, appDTODataProductos , appDTOParamProductos, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del producto a modificar."})
    }else{
        try{
            let result = await users.updateOne(
                { "_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageProductos.delete("/:id?", limitGet(), appMiddlewareProductosVerify, appDTOParamProductos, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del producto a eliminar."})
    } else {
        try{
            let result = await bodegas.deleteOne(
                { "_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageProductos;