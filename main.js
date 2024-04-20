require('dotenv').config() // Variables de entorno que estan corriendo en node, usando la libreria dotenv https://www.npmjs.com/package/dotenv

const express = require("express");
const cors = require('cors');
const fs = require('fs');

const router = require('./rutes/rutes');

// Crear el servidor de express
const app = express();


// Configurar los cors
app.use(cors());

// Rutas
app.use('/', router);

// Escuchar Servidor
app.listen(process.env.PORT, () => {
    console.log("Server runing on port " + process.env.PORT)
})



