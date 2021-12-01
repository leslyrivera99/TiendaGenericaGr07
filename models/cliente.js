//Modelo de datos de clientes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema de datos
const clienteSchema = new Schema({
    cedula_cliente: Number,
    correo_cliente: String,
    direccion_cliente: String,
    nombre_cliente: String,
    telefono_cliente: Number
});

//Llamado del modelo
const clientes = mongoose.model('clientes', clienteSchema);

module.exports = clientes;