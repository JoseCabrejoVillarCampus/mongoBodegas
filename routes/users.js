import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareUsersVerify, appDTODataUsers, appDTOParamUsers} from '../middleware/usersmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Users } from '../dtocontroller/usersdto.js';
let storageUsers = Router();

let db = await coneccion();
let users = db.collection("users");

storageUsers.get('/:id?', limitGet(), appMiddlewareUsersVerify ,async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await users.find({}).toArray()
    : await users.find({ "id": parseInt(req.params.id)}).toArray();
    res.send(result)
});

storageUsers.post('/', limitGet(), appMiddlewareUsersVerify, appDTODataUsers , async(req, res) => {
    if(!req.rateLimit) return;
    try{
        let result = await users.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Users);

        res.send(err);
    }
});
storageUsers.put("/:id?", limitGet(), appMiddlewareUsersVerify, appDTODataUsers , appDTOParamUsers, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del usuario a modificar."})
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
storageUsers.delete("/:id?", limitGet(), appMiddlewareUsersVerify, appDTOParamUsers, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del usuario a eliminar."})
    } else {
        try{
            let result = await users.deleteOne(
                { "_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageUsers;