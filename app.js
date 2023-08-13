import dotenv from 'dotenv';
import express from 'express';
import { appToken, appVerify } from './limit/token.js';
import storageUsers from './routes/users.js';
import storageBodegas from './routes/bodegas.js';
import storageProductos from './routes/productos.js';
import storageInventarios from './routes/inventarios.js';
import storageHistoriales from './routes/historiales.js';

dotenv.config();
let app = express();

app.use(express.json());
app.use("/users", appVerify ,storageUsers);
app.use("/bodegas", appVerify, storageBodegas);
app.use("/productos", appVerify, storageProductos);
app.use("/inventarios", appVerify, storageInventarios);
app.use("/historiales", appVerify, storageHistoriales);
app.use("/token", appToken);

let config = JSON.parse(process.env.MY_SERVER);
console.log(config);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});