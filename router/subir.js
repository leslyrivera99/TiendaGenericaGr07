const express = require('express');
const router = express.Router();

//Llamado al modelo de datos
const productos = require('../models/producto');

router.get('/', async(req, res)=>{
    try{
        const listaProductos = await productos.find();
        console.log(listaProductos);
        res.render('productos', {listaProductos});
    } catch(error){
        console.log(error);
        res.render('productos', {
            listaProductos:[
                {codigo_producto:'Error en el cargue', nombre_producto:'---', nitproveedor:'---', precio_compra:"---", ivacompra:'---', precio_venta:'---',}
            ]
        })
    }
    
});




router.get('/:id', async(req, res) =>{
    const id = req.params.id;
    console.log(id);
    const id2 = id.replace('E','');
    console.log(id2);
    const fs = require('fs');
    const parser = require('csv-parser');
    const data = [];
    fs.createReadStream(id)
    .pipe(parser({
    separator: ',',
    newline: '\n',
    }))
    .on('data', row => data.push(row))
    .on('end', () => console.log(data));
    console.log(data)

});



module.exports = router;