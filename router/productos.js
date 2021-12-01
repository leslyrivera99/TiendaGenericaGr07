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

router.post('/', async (req, res) => {
    const body = req.body;
    try{
        const productoDB = new productos(body);
        const productoUpdate = await productos.findOne({codigo_producto: productoDB.codigo_producto});
        if (productoUpdate){
            await productos.updateOne({codigo_producto: productoDB.codigo_producto},{
                codigo_producto:productoDB.codigo_producto,
                nombre_producto: productoDB.nombre_producto,
                nitproveedor: productoDB.nitproveedor,
                precio_compra: productoDB.precio_compra,
                ivacompra: productoDB.ivacompra,
                precio_venta: productoDB.precio_venta
            });
            console.log(body);
            res.redirect('productos')
        }else{
            await productoDB.save();
            console.log(productoDB);
            res.redirect('productos')
        }
        
    }catch(error){
        console.log(error);
    }
});



router.get('/:id', async(req, res) =>{
    const id = req.params.id;
    console.log(id);
    const id2 = id.replace('E','');
    console.log(id2);
    
    try{
        const productoDB = await productos.findOne({codigo_producto: id2});
        console.log("----------------------------------------------");
        const regex = /^[0-9]*$/;
        if(id.charAt(0) == "E"){
            await productos.deleteOne(productoDB)
            console.log(clienteDB);
            res.redirect('productos');
        }else if (regex.test(id)){
            console.log(productoDB);
            res.render('detalleProducto', {
            producto:productoDB,
            error:false
            });
        }else{
            const fs = require('fs');
            const parser = require('csv-parser');
            const data = [];
            fs.createReadStream(id)
            .pipe(parser({
            separator: ',',
            newline: '\n',
            }))
            .on('data', row => data.push(row))
            .on('end', () => console.log(data))

        }
    }catch(error){
        res.redirect('../productos');
    }
});



module.exports = router;