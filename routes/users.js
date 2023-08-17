import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareUsersVerify, appDTODataUsers, appDTOParamUsers} from '../middleware/usersmiddleware.js';
import { processErrors } from '../common/Function.js';
import { Users } from '../dtocontroller/usersdto.js';
import { ObjectId } from 'mongodb';
let storageUsers = Router();

let db = await coneccion();
let users = db.collection("users");

storageUsers.use(expressQueryBoolean());

const getUsersById = (id)=>{
    return new Promise(async(resolve)=>{
        let objectId = new ObjectId(id);
        let result = await users.find({ "_id": objectId}).toArray();
        resolve(result);
    })
};
const getUsersAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await users.find({}).toArray();
        resolve(result);
    })
};
storageUsers.get("/", limitGet() ,appMiddlewareUsersVerify ,async(req, res)=>{
    try{
        const {id} = req.query;
        if(id){
            const data = await getUsersById(id);
            res.send(data)
        } else {
            const data = await getUsersAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
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

storageUsers.put("/:id?", limitGet(), appMiddlewareUsersVerify, appDTODataUsers, appDTOParamUsers, async(req, res) => {
    if (!req.rateLimit) return;
    if (!req.params.id) {
        res.send({ message: "Para realizar el método update es necesario ingresar el id del usuario a modificar." });
    } else {
        try {
            const result = await users.updateOne(
                { "_id": new ObjectId(req.params.id) },
                { $set: req.body }
            );
            res.send(result);
        } catch (error) {
            res.status(422).send(error);
        }
    }
});

storageUsers.delete("/:id?", limitGet(), appMiddlewareUsersVerify, appDTOParamUsers, async(req, res) => {
    if (!req.rateLimit) return;
    if (!req.params.id) {
        res.status(404).send({ message: "Para realizar el método delete es necesario ingresar el id del usuario a eliminar." });
    } else {
        try {
            const result = await users.deleteOne(
                { "_id": new ObjectId(req.params.id) }
            );
            res.status(200).send(result);
        } catch (error) {
            res.status(422).send(error);
        }
    }
});

export default storageUsers;