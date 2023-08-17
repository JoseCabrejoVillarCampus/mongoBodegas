import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareProductosVerify, appDTODataProductos, appDTOParamProductos} from '../middleware/productosmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Productos } from '../dtocontroller/productosdto.js';
import { ObjectId } from 'mongodb';
let storageProductos = Router();

let db = await coneccion();
let productos = db.collection("productos");

storageProductos.use(expressQueryBoolean());

const getProductosById = (id)=>{
    return new Promise(async(resolve)=>{
        const objectId = new ObjectId(id);
        let result = await productos.find({ "_id": objectId}).toArray();
        resolve(result);
    })
};
const getProductosAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await productos.find({}).toArray();
        resolve(result);
    })
};
const getProductosTotal = ()=>{
    return new Promise(async(resolve)=>{
        let result = await productos.find({}).sort({ total: -1 }).toArray();
        resolve(result);
    })
};
storageProductos.get("/", limitGet() ,appMiddlewareProductosVerify ,async(req, res)=>{
    try{
        const {id} = req.query;
        if(id){
            const data = await getProductosById(id);
            res.send(data)
        } else {
            const data = await getProductosAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageProductos.get("/total", limitGet() ,appMiddlewareProductosVerify ,async(req, res)=>{
    try{
        const data = await getProductosTotal();
        res.send(data)
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
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
            const result = await productos.updateOne(
                { "_id": new ObjectId(req.params.id) },
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
            const result = await productos.deleteOne(
                { "_id": new ObjectId(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageProductos;