//Modelo de datos de ventas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema de datos
const ventaSchema = new Schema({
    cedula_cliente: Number,
    valor_venta: Number,
    valor_iva: Number,
    valor_total: Number,
    sucursal: String,
});

//Llamado del modelo
const ventas = mongoose.model('ventas', ventaSchema);

module.exports = ventas;