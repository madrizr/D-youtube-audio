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
    const expresionRegular = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const coincidencia = url.match(expresionRegular);
    return coincidencia ? coincidencia[1] : null;
}

const bytesToMb = (bytes) => (bytes / 1000000).toFixed(2);
const segToMin = (seg) => (seg / 60).toFixed(2);


module.exports = {download, getIDYouTube, bytesToMb, segToMin};