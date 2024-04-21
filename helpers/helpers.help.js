const https = require('https');
const fs = require('fs');

// Descarga

const download = (url, format, title) => {
    try {

        const fileUrl = url;
        const localFilePath = `${title}.${format}`;
        
        const file = fs.createWriteStream(localFilePath);
    
        https.get(fileUrl, (response) => {
            response.pipe(file);
            
            file.on('finish', function() {
                file.close(() => {
                    console.log('Archivo descargado correctamente.');
                });
            });
        }).on('error', function(err) {
            fs.unlink(localFilePath, () => {}); // Eliminar el archivo en caso de error
            console.error('Error al descargar el archivo:', err.message);
        });

    }catch(error){
        console.log(error)
    }  
}

const getIDYouTube = (url) => {
    const type_url1 = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const type_url2 = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/?([^&]+)\?si=([^&]+)/;
    
    const coincidence = url.match(type_url1);
    const coincidence2 = url.match(type_url2);
    if(coincidence) return coincidence[1]
    if(coincidence2) return coincidence2[1]
    else return null;
}


const bytesToMb = (bytes) => (bytes / 1000000).toFixed(2);
const segToMin = (seg) => (seg / 60).toFixed(2);


module.exports = {download, getIDYouTube, bytesToMb, segToMin};