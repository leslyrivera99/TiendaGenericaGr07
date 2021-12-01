const express = require('express');
const router = express.Router();

//Llamado al modelo de datos
const ventas = require('../models/venta');
const clientes = require('../models/cliente');

router.get('/', async(req, res)=>{
    try{
        const listaVentas = await ventas.find();
        const listaClientes = await clientes.find();
        console.log(listaVentas);
        const reporte = [];
        listaVentas.forEach(elemento => {
            const client = listaClientes.filter(function(buscar) {
                return buscar.cedula_cliente === elemento.cedula_cliente;
            });
            console.log('------------------');
            console.log(client);
            reporte.push({
                cedula_cliente:elemento.cedula_cliente,
                nombre_cliente:client[0].nombre_cliente,
                valor_total:elemento.valor_total
            });
        });
        res.render('reporteVentas', {reporte});
    } catch(error){
        console.log(error);
        res.render('reporteVentas', {
            reporte:[
                {cedula_cliente:'error', nombre_cliente:'---', valor_total:"---",},
            ]
        })
    }
    
});


module.exports = router;