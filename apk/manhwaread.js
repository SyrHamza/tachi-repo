const source = {
    name: "ManhwaRead",
    baseUrl: "https://manhwaread.com",
    lang: "en",
    type: "js",

    // Holt die neuesten Updates
    getLatestRequest: (page) => {
        return `${source.baseUrl}/manga/page/${page}/?m_order=latest`;
    },

    // Verarbeitet die Liste der Mangas
    parseMangaList: (html) => {
        const mangaList = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // Wir suchen nach dem Container, den du im Screenshot hattest
        const items = doc.querySelectorAll('div.page-item-detail, div.c-tabs-item__content');
        
        items.forEach(item => {
            const titleElement = item.querySelector('div.post-title h3 a, h3 a');
            const imgElement = item.querySelector('img');
            
            if (titleElement) {
                mangaList.push({
                    name: titleElement.textContent.trim(),
                    url: titleElement.getAttribute('href'),
                    thumbnail: imgElement ? (imgElement.getAttribute('data-src') || imgElement.getAttribute('src')) : ""
                });
            }
        });
        return mangaList;
    },

    // Suche-Funktion
    getSearchRequest: (query, page) => {
        return `${source.baseUrl}/page/${page}/?s=${query}&post_type=wp-manga`;
    },

    // Kapitel-Liste einer Serie
    parseChapterList: (html) => {
        const chapters = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('li.wp-manga-chapter');
        rows.forEach(row => {
            const a = row.querySelector('a');
            if (a) {
                chapters.push({
                    name: a.textContent.trim(),
                    url: a.getAttribute('href')
                });
            }
        });
        return chapters;
    },

    // Die eigentlichen Bilder im Kapitel
    parsePageList: (html) => {
        const pages = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const images = doc.querySelectorAll('div.page-break img');
        images.forEach(img => {
            const src = img.getAttribute('data-src') || img.getAttribute('src');
            if (src) pages.push(src.trim());
        });
        return pages;
    }
};

module.exports = source;
