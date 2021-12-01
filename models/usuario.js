//Modelo de datos de clientes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema de datos
const usuarioSchema = new Schema({
    cedula_usuario: Number,
    nombre_usuario: String,
    nombre: String,
    telefono_usuario: Number,
    direccion_usuario: String,
    sucursal: String,
    contraseña: String,
});

//Llamado del modelo
const usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarios;