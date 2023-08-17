import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import { appMiddlewareBodegasVerify, appDTODataBodegas, appDTOParamBodegas } from '../middleware/bodegasmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Bodegas } from '../dtocontroller/bodegasdto.js';
import { ObjectId } from 'mongodb';
let storageBodegas = Router();

let db = await coneccion();
let bodegas = db.collection("bodegas");

storageBodegas.use(expressQueryBoolean());

const getBodegasById = (id) => {
    return new Promise(async (resolve) => {
        const objectId = new ObjectId(id); 
        let result = await bodegas.aggregate([
            {
                $match:{
                    _id: objectId 
                }
            },
            {
                $project:{
                    "_id":0,
                    "id" :"$_id",
                    "name":"$nombre",
                    "responsibleID":"$id_responsable",
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
    });
};

const getBodegasAll = () => {
    return new Promise(async (resolve) => {
        let result = await bodegas.aggregate([
            {
                $project:{
                    "_id":0,
                    "id" :"$_id",
                    "name":"$nombre",
                    "responsibleID":"$id_responsable",
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
    });
};

const getBodegasAlphabetic = () => {
    return new Promise(async (resolve) => {
        let result = await bodegas.find({}).sort({ nombre: 1 }).toArray();
        resolve(result);
    });
};

storageBodegas.get("/", limitGet(), appMiddlewareBodegasVerify, async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const data = await getBodegasById(id);
            res.send(data);
        } else {
            const data = await getBodegasAll();
            res.send(data);
        }
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

storageBodegas.get("/alphabetic", limitGet(), appMiddlewareBodegasVerify, async (req, res) => {
    try {
            const data = await getBodegasAlphabetic();
            res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
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
            const result = await bodegas.updateOne(
                { "_id": new ObjectId(req.params.id) },
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
            const result = await bodegas.deleteOne(
                { "_id": new ObjectId(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageBodegas;