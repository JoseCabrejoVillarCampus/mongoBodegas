import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareInventariosVerify, appDTODataInventarios, appDTOParamInventarios} from '../middleware/inventariosmidddleware.js';
import { processErrors } from '../common/Function.js';
import { Inventarios } from '../dtocontroller/inventariosdto.js';
import { ObjectId } from 'mongodb';
let storageInventarios = Router();

let db = await coneccion();
let inventarios = db.collection("inventarios");

storageInventarios.use(expressQueryBoolean());

const getInventariosById = (id)=>{
    return new Promise(async(resolve)=>{
        const objectId = new ObjectId(id);
        let result = await inventarios.find({ "_id": objectId}).toArray();
        resolve(result);
    })
};
const getInventariosAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await inventarios.find({}).toArray();
        resolve(result);
    })
};
storageInventarios.get("/", limitGet() ,appMiddlewareInventariosVerify ,async(req, res)=>{
    try{
        const {id} = req.query;
        if(id){
            const data = await getInventariosById(id);
            res.send(data)
        } else {
            const data = await getInventariosAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
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