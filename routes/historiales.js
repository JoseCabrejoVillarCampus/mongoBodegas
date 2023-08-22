import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareHistorialesVerify, appDTODataHistoriales, appDTOParamHistoriales} from '../middleware/historialesmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Historiales } from '../dtocontroller/historialesdto.js';
import { ObjectId } from 'mongodb';
let storageHistoriales = Router();

let db = await coneccion();
let historiales = db.collection("historiales");

storageHistoriales.use(expressQueryBoolean());

const getHistorialesById = (id)=>{
    return new Promise(async(resolve)=>{
        const objectId = new ObjectId(id);
        let result = await historiales.aggregate([
            {
                $match:{
                    _id: objectId 
                }
            },
            {
                $project:{
                    "_id":0,
                    "id" :"$_id",
                    "amount":"$cantidad",
                    "originStoreId":"$id_bodega_origen",
                    "destinationStoreId":"$id_bodega_destino",
                    "inventoryId":"$id_inventario",
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
const getHistorialesAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await historiales.aggregate([
            {
                $project:{
                    "_id":0,
                    "id" :"$_id",
                    "amount":"$cantidad",
                    "originStoreId":"$id_bodega_origen",
                    "destinationStoreId":"$id_bodega_destino",
                    "inventoryId":"$id_inventario",
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
storageHistoriales.get("/", limitGet() ,appMiddlewareHistorialesVerify ,async(req, res)=>{
    try{
        const {id} = req.query;
        if(id){
            const data = await getHistorialesById(id);
            res.send(data)
        } else {
            const data = await getHistorialesAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

storageHistoriales.post('/', limitGet(), appMiddlewareHistorialesVerify, appDTODataHistoriales , async(req, res) => {
    if(!req.rateLimit) return;
    let data = {...req.body, created_at: new Date(req.body.created_at), update_at: new Date(req.body.update_at), deleted_at: new Date(req.body.deleted_at)}
    try{
        let result = await historiales.insertOne(data);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Historiales);

        res.send(err);
    }
});
storageHistoriales.put("/:id?", limitGet(), appMiddlewareHistorialesVerify, appDTODataHistoriales , appDTOParamHistoriales, async(req, res)=>{
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
        const result = await historiales.updateOne(
            { "_id": new ObjectId(req.params.id) },
            { $set: data }
        );
        res.send(result);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ message: "Error inesperado en el servidor." });
    }
});
storageHistoriales.delete("/:id?", limitGet(), appMiddlewareHistorialesVerify, appDTOParamHistoriales, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la bodega de origen cuyo historial desea eliminar."})
    } else {
        try{
            const result = await historiales.deleteOne(
                { "_id": new ObjectId(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageHistoriales;