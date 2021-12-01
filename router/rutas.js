const express = require('express');
const router = express.Router();

/*router.get('/', (req, res)=>{
    res.render('index');
});*/
/*
router.get('/productos', (req, res)=>{
    res.render('productos');
});
*/

router.get('/ventas', (req, res)=>{
    res.render('ventas');
});

router.get('/reportes', (req, res)=>{
    res.render('reportes');
});

router.get('/consolidacion', (req, res)=>{
    res.render('consolidado');
});

router.get('/crear', (req, res)=>{
    res.render('crearUsuario');
});

module.exports = router;