const express = require('express');
const router = express.Router();

const usuarios = require('../models/usuario');

router.get('/', async(req, res)=>{
    res.render('index', {
        error: false,
    });
    });

router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);
    try{
        const usuarioDB = await usuarios.findOne({nombre_usuario:body.user});
        console.log(usuarioDB);
        if (usuarioDB.contraseña != body.pass){
            res.render('index', {
                error:true,
                mensaje: 'Error en contraseña y/o usuario'
            });
        }else{
            res.render('principal', {
                usuario:usuarioDB,
                title:'Bienvenido Usuario: '
            });
        }
    }catch(error){
        res.render('index', {
            error:true,
            mensaje:'Error en contraseña y/o usuario'
        });
    }

});

module.exports = router;