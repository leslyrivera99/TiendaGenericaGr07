const express = require('express');
const router = express.Router();

//Llamado al modelo de datos
const clientes = require('../models/cliente');

router.get('/', async(req, res)=>{
    try{
        const listaClientes = await clientes.find();
        console.log(listaClientes);
        res.render('reporteClientes', {listaClientes});
    } catch(error){
        console.log(error);
        res.render('reporteClientes', {
            listaClientes:[
                {cedula_cliente:'Error en el cargue', correo_cliente:'---', direccion_cliente:'---', nombre_cliente:"---", telefono_cliente:'---'},
            ]
        })
    }
    
});


module.exports = router;