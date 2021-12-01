//Modelo de datos de clientes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema de datos
const productoSchema = new Schema({
    codigo_producto: Number,
    nombre_producto: String,
    nitproveedor: Number,
    precio_compra: Number,
    ivacompra: Number,
    precio_venta: Number
});

//Llamado del modelo
const productos = mongoose.model('productos', productoSchema);

module.exports = productos;