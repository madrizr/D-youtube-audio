"use strict"
/*
    Ruta: /api
*/
const { Router } = require('express');
const {getDataAudio, msgData} = require('../controllers/convert');

const router = Router();

router.get( '/', msgData);
router.get( '/getaud', getDataAudio);


module.exports = router;