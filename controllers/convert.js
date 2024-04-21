const { response } = require('express');

// Cache
const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 200});

const getDataService = require('../services/getData.service');

const mensajes =  {
    ErrorInesperado: {ok: false,  msg: 'Error inesperado'},
    syntaxCorecta: {ok: true,  msg: 'la ruta correcta debe ser /getaud?url={url_video}'}
}


const getDataAudio = async (req, res = response) => {

    try {
        const url = req.query.url;
       
        // Administrar cache
        if(url === myCache.get('url')){
            const data = myCache.get('getData');
            return res.json({ ok: true, data })
        }

        const getData = await getDataService(url);
        
        if(getData.status === 200) {
            myCache.set('url', url);
            myCache.set('getData', getData);
            return res.json({ ok: true, data: getData})
        }
        else throw getData
    } 
    catch(error){
        const { ok, msg } = mensajes.ErrorInesperado
        return res.json({ ok, msg, error })
    }
}

// Si la ruta es '/'
const msgData = (req, res = response) => {
    return res.status(200).json(
        mensajes.syntaxCorecta
    )
}

module.exports = {getDataAudio, msgData};