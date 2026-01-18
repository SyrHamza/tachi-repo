const config = {
    name: "ManhwaRead",
    baseUrl: "https://manhwaread.com",
    lang: "en",
    type: "madara",
    iconUrl: "https://manhwaread.com/favicon.ico"
};

class ManhwaRead extends Madara {
    constructor() {
        super(config);
    }

    // Hier nutzen wir deine Selektoren aus dem Screenshot
    get selectors() {
        return {
            mangaList: "div.c-tabs-item__content",
            title: "div.post-title h3 a",
            url: "div.post-title h3 a",
            thumbnail: "img.img-responsive"
        };
    }
}

module.exports = new ManhwaRead();
