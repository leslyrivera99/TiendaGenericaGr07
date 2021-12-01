const express = require('express');
const router = express.Router();

//Llamado al modelo de datos
const clientes = require('../models/cliente');

router.get('/', async(req, res)=>{
    try{
        const listaClientes = await clientes.find();
        console.log(listaClientes);
        res.render('clientes', {listaClientes});
    } catch(error){
        console.log(error);
        res.render('clientes', {
            listaClientes:[
                {cedula_cliente:'Error en el cargue', correo_cliente:'---', direccion_cliente:'---', nombre_cliente:"---", telefono_cliente:'---'},
            ]
        })
    }
    
});


//Llamar la ruta de datos y conectar con la base de datos
router.post('/', async (req, res) => {
    const body = req.body;
    try{
        const clienteDB = new clientes(body);
        const clienteUpdate = await clientes.findOne({cedula_cliente: clienteDB.cedula_cliente});
        if (clienteUpdate){
            await clientes.updateOne({cedula_cliente: clienteDB.cedula_cliente},{
                cedula_cliente:clienteDB.cedula_cliente,
                correo_cliente: clienteDB.correo_cliente,
                direccion_cliente: clienteDB.direccion_cliente,
                nombre_cliente: clienteDB.nombre_cliente,
                telefono_cliente: clienteDB.telefono_cliente
            });
            console.log(body);
            res.redirect('clientes')
        }else{
            await clienteDB.save();
            console.log(clienteDB);
            res.redirect('clientes')
        }
        
    }catch(error){
        console.log(error);
    }
});


//Detallar cliente para editar y borrar
router.get('/:id', async(req, res) =>{
    const id = req.params.id;
    console.log(id);
    const id2 = id.replace('E','');
    console.log(id2);
    
    try{
        const clienteDB = await clientes.findOne({cedula_cliente: id2});
        console.log("----------------------------------------------");
        if(String(id).includes("E")){
            await clientes.deleteOne(clienteDB)
            console.log(clienteDB);
            res.redirect('clientes');
        }else{
            console.log(clienteDB);
            res.render('detalle', {
            cliente:clienteDB,
            error:false
            });
        }
    }catch(error){
        res.redirect('../clientes');
    }
});


module.exports = router;