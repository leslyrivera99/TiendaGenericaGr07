const express = require('express');
const router = express.Router();

//Llamado al modelo de datos
const usuarios = require('../models/usuario');

router.get('/', async(req, res)=>{
    res.render('principal', {
        usuario:null,
        title: ''
    });
});


//Llamar la ruta de datos y conectar con la base de datos
router.post('/', async (req, res) => {
    const body = req.body;
    try{
        const usuarioDB = new usuarios(body);
        const usuarioUpdate = await usuarios.findOne({cedula_usuario: usuarioDB.cedula_usuario});
        if (usuarioUpdate){
            await usuarios.updateOne({cedula_usuario: usuarioDB.cedula_usuario},{
                cedula_usuario:usuarioDB.cedula_usuario,
                nombre_usuario: usuarioDB.nombre_usuario,
                nombre: usuarioDB.nombre,
                telefono_usuario: usuarioDB.telefono_usuario,
                direccion_usuario: usuarioDB.direccion_usuario,
                sucursal: usuarioDB.sucursal,
                contraseña: usuarioDB.contraseña
            });
            console.log(body);
            res.render('principal', {
                usuario:usuarioDB,
                title:'Bienvenido Usuario: '
            })
        }else{
            await usuarioDB.save();
            console.log(usuarioDB);
            res.render('principal', {
                usuario:usuarioDB,
                title:'Bienvenido Usuario: '
            })
        }
        
    }catch(error){
        console.log(error);
        res.render('index', {
            error:true,
            mensaje:'Error en la creación de usuario'
        });
    }
});


module.exports = router;