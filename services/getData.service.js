const DataFileAudio = require('../models/dataFileAudio.model');
const {getIDYouTube, bytesToMb, segToMin} = require('../helpers/helpers.help')

const mensajes = {
    VideoNoEncontrado: {status: 404, msg: 'video not found'},
    VideoEncontrado: {status: 200, msg: 'success'}
}

const getDataService = async (url) => {
    const idVideo = getIDYouTube(url);

    const urlApi = `https://youtube-mp36.p.rapidapi.com/dl?id=${idVideo}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    };
    try {
        const response = await fetch(urlApi, options);
	    const result = await response.json();
        if(result.code === 403) throw error;

        const { title, filesize, duration, msg, link} = result;
        const { status } = mensajes.VideoEncontrado;
        
        const fileSize = bytesToMb(filesize);
        const min = segToMin(duration);
        const format = 'mp3';
        const audioQuality = 'Medio';

        // downloadFile(url, title)
        return { status, title, fileSize, min, msg, url: link, format, audioQuality}
    } 
    catch(error){
        const { status, msg } = mensajes.VideoNoEncontrado;
        return { status, msg, error }
    }
}

module.exports = getDataService;

