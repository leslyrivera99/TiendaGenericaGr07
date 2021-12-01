/* Proyecto Tienda Genérica - Grupo 07
Fernando Sánchez / Andrés Rivas / Oscar Rojas / Leidy Ruiz / Lesly Rivera*/ 

// Construcción de un servidor con express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4500;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//Conexion a la base de datos
const mongoose = require("mongoose");
const usuario = '';
const password = '';
const dbName = 'tiendaGenerica';
const uri = 'mongodb://localhost:27017/tiendaGenerica';

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('Connection established to the database'))
.catch(e => console.log('Connection error', e));

//llamado al motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Configuración carpeta public y mildware
app.use(express.static(__dirname + "/public"));

//rutas del directorio web
app.use('/', require('./router/usuarios'));
app.use('/', require('./router/rutas'));
app.use('/clientes', require('./router/clientes'));
app.use('/principal', require('./router/principal'));
app.use('/RClientes', require('./router/listadoClientes'));
app.use('/RVentas', require('./router/reporteVentas'));
app.use('/productos', require('./router/productos'));
app.use('/subirProductos', require('./router/subir'));

//Llamado a pagina de error sí no se encuentra
app.use((req, res, next)=>{
    res.status(404).render("404");
});

// Llamar al servidor con express
app.listen(port, () => {
    console.log(`Call to the server on http://localhost:${port}`);
});
