class DataFileAudio{
	constructor(id, title, description, author, url, audioQuality, container){
		this.id= id;
		this.title = title;
		this.description = description;
		this.author = author;
        features: {
            this.url = url,
            this.audioQuality = audioQuality,
            this.format = container

        }
	}
}

module.exports = DataFileAudio;
