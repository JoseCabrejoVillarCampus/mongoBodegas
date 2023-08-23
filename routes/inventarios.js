import {Router} from 'express';
import {coneccion} from "../db/atlas.js";
import {limitGet} from '../limit/config.js';
import {plainToClass} from 'class-transformer';
import {DTO} from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareInventariosVerify,appDTODataInventarios,appDTOParamInventarios} from '../middleware/inventariosmidddleware.js';
import {processErrors} from '../common/Function.js';
import {Inventarios} from '../dtocontroller/inventariosdto.js';
import {ObjectId} from 'mongodb';
let storageInventarios = Router();

let db = await coneccion();
let inventarios = db.collection("inventarios");

storageInventarios.use(expressQueryBoolean());

const getInventariosById = (id) => {
    return new Promise(async (resolve) => {
        const objectId = new ObjectId(id);
        let result = await inventarios.aggregate([{
                $match: {
                    _id: objectId
                }
            },
            {
                $project: {
                    "_id": 0,
                    "id": "$_id",
                    "storeID": "$id_bodega",
                    "productID": "$id_producto",
                    "amount": "$cantidad",
                    "userCreator": "$created_by",
                    "userUpdater": "$update_by",
                    "creationDate": "$created_at",
                    "updateDate": "$update_at",
                    "deleteDate": "$deleted_at"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getInventariosAll = () => {
    return new Promise(async (resolve) => {
        let result = await inventarios.aggregate([{
            $project: {
                "_id": 0,
                "id": "$_id",
                "storeID": "$id_bodega",
                "productID": "$id_producto",
                "amount": "$cantidad",
                "userCreator": "$created_by",
                "userUpdater": "$update_by",
                "creationDate": "$created_at",
                "updateDate": "$update_at",
                "deleteDate": "$deleted_at"
            }
        }]).toArray();
        resolve(result);
    })
};
storageInventarios.get("/", limitGet(), appMiddlewareInventariosVerify, async (req, res) => {
    try {
        const {
            id
        } = req.query;
        if (id) {
            const data = await getInventariosById(id);
            res.send(data)
        } else {
            const data = await getInventariosAll();
            res.send(data);
        }
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

storageInventarios.post('/', limitGet(), appMiddlewareInventariosVerify, appDTODataInventarios, async (req, res) => {
    if (!req.rateLimit) return;
    let data = {
        ...req.body,
        created_at: new Date(req.body.created_at),
        update_at: new Date(req.body.update_at),
        deleted_at: new Date(req.body.deleted_at)
    }
    try {
        let result = await inventarios.insertOne(data);
        res.status(201).send(result);
    } catch (error) {
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Inventarios);

        res.send(err);
    }
});
storageInventarios.post('/registros', limitGet(), appMiddlewareInventariosVerify, appDTODataInventarios, async (req, res) => {
    if (!req.rateLimit) return;
    let data = {
        ...req.body,
        created_at: new Date(req.body.created_at),
        update_at: new Date(req.body.update_at),
        deleted_at: new Date(req.body.deleted_at)
    }
    try {
        // Insertar o actualizar el inventario
        var nuevoInventario = {
            id_bodega: req.body.id_bodega,
            id_producto: req.body.id_producto,
            cantidad: req.body.cantidad,
            created_by: 1,
            update_by: 1,
            created_at: "2023-08-16",
            update_at: "2023-08-16",
            deleted_at: "",
        };
        var filtro = {
            id_bodega: nuevoInventario.id_bodega,
            id_producto: nuevoInventario.id_producto,
        };
        db.inventarios.updateOne(
            filtro, {
                $set: {
                    id_bodega: nuevoInventario.id_bodega,
                    id_producto: nuevoInventario.id_producto,
                    update_by: nuevoInventario.update_by,
                    update_at: nuevoInventario.update_at,
                    deleted_at: nuevoInventario.deleted_at,
                },
                $inc: {
                    cantidad: nuevoInventario.cantidad,
                },
                $setOnInsert: {
                    created_by: nuevoInventario.created_by,
                    created_at: nuevoInventario.created_at,
                },
            }, {
                upsert: true
            }
        );

        res.status(201).send("Inventario actualizado o insertado exitosamente.");
    } catch (error) {
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Inventarios);

        res.send(err);
    }
});

storageInventarios.post('/cantbodega', limitGet(), appMiddlewareInventariosVerify, appDTODataInventarios, async (req, res) => {
    if (!req.rateLimit) return;
    let data = {
        ...req.body,
        created_at: new Date(req.body.created_at),
        update_at: new Date(req.body.update_at),
        deleted_at: new Date(req.body.deleted_at)
    }
    try {
        let result = await inventarios.insertOne(data);
        const nuevoProductoId = result.insertedId;

        db.inventarios.insertOne({
            id_bodega: 1,
            id_producto: nuevoProductoId,
            cantidad: 10,
            created_by: 1,
            update_by: 1,
            created_at: "2023-08-16",
            update_at: "2023-08-16",
            deleted_at: "2023-08-16",
        });

        res.status(201).send(result);
    } catch (err) {
        /* const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Inventarios); */

        res.send(err);
    }
});

storageInventarios.put("/:id?", limitGet(), appMiddlewareInventariosVerify, appDTODataInventarios, appDTOParamInventarios, async (req, res) => {
    try {
        if (!req.rateLimit) {
            throw new Error("Rate limit not satisfied.");
            }   
            const parsedDates = ['created_at', 'update_at', 'deleted_at'];
            const data = {...req.body};
            for (const dateField of parsedDates) {
                if (data[dateField]) {
                    data[dateField] = new Date(data[dateField]);
                }
            }
            if (!req.params.id) {
                return res.status(400).send({ message: "Para realizar el método update es necesario ingresar el id del usuario a modificar." });
            }
            const result = await inventarios.updateOne(
                { "_id": new ObjectId(req.params.id) },
                { $set: data }
            );
            res.send(result);
            } catch (error) {
                console.error("An error occurred:", error);
            res.status(500).send({ message: "Error inesperado en el servidor." });
            }
});
storageInventarios.delete("/:id?", limitGet(), appMiddlewareInventariosVerify, appDTOParamInventarios, async (req, res) => {
    if (!req.rateLimit) return;
    if (!req.params.id) {
        res.status(404).send({
            message: "Para realizar el método delete es necesario ingresar el id de la bodega cuyo inventario desea eliminar."
        })
    } else {
        try {
            const result = await inventarios.deleteOne({
                "_id": new ObjectId(req.params.id)
            });
            res.status(200).send(result)
        } catch (error) {
            res.status(422).send(error)
        }
    }
});
export default storageInventarios;