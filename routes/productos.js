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
        let result = await productos.aggregate([
            {
                $match:{
                    _id: objectId 
                }
            },
            {
                $project:{
                    "_id":0,
                    "id" :"$_id",
                    "codigoProducto":"$idProducto",
                    "name":"$nombre",
                    "about":"$descripcion",
                    "state":"$estado",
                    "userCreator":"$created_by",
                    "userUpdater":"$update_by",
                    "creationDate":"$created_at",
                    "updateDate":"$update_at",
                    "deleteDate":"$deleted_at"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getProductosAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await productos.aggregate([
            {
                $project:{
                    "_id":0,
                    "id" :"$_id",
                    "codigoProducto":"$idProducto",
                    "name":"$nombre",
                    "about":"$descripcion",
                    "state":"$estado",
                    "userCreator":"$created_by",
                    "userUpdater":"$update_by",
                    "creationDate":"$created_at",
                    "updateDate":"$update_at",
                    "deleteDate":"$deleted_at"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getProductosTotal = ()=>{
    return new Promise(async(resolve)=>{
        let result = await productos.aggregate([
            {
              $lookup: {
                from: "inventarios",
                localField: "idProducto",
                foreignField: "id_producto",
                as: "inventory"
              }
            },
            {
              $unwind: "$inventory"
            },
            {
              $group: {
                _id: "$_id",
                nombre: { $first: "$nombre" },
                descripcion: { $first: "$descripcion" },
                Total: { $sum: "$inventory.cantidad" }
              }
            },
            {
              $sort: { Total: -1 }
            }
          ]).toArray();
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
    let data = {...req.body, created_at: new Date(req.body.created_at), update_at: new Date(req.body.update_at), deleted_at: new Date(req.body.deleted_at)}
    try{
        let result = await productos.insertOne(data);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Productos);

        res.send(err);
    }
});
storageProductos.put("/:id?", limitGet(), appMiddlewareProductosVerify, appDTODataProductos , appDTOParamProductos, async(req, res)=>{
    try {
        if (!req.rateLimit) {
            throw new Error("Rate limit not satisfied.");
        }
        const parsedDates = ['created_at', 'update_at', 'deleted_at'];
        const data = { ...req.body };
        for (const dateField of parsedDates) {
            if (data[dateField]) {
                data[dateField] = new Date(data[dateField]);
            }
        }
        if (!req.params.id) {
            return res.status(400).send({ message: "Para realizar el método update es necesario ingresar el id del usuario a modificar." });
        }
        const result = await productos.updateOne(
            { "_id": new ObjectId(req.params.id) },
            { $set: data }
        );
        res.send(result);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ message: "Error inesperado en el servidor." });
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