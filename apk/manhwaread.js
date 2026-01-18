/*
 * @name ManhwaRead
 * @version 1.0.7
 * @lang en
 * @type js
 */

const source = {
    name: "ManhwaRead",
    baseUrl: "https://manhwaread.com",
    lang: "en",
    type: "js",

    // 1. Neueste Updates (Startseite)
    getLatestRequest: (page) => {
        return `${source.baseUrl}/manga/page/${page}/?m_order=latest`;
    },

    // 2. Mangas aus der Webseite auslesen
    parseMangaList: (html) => {
        const mangaList = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const items = doc.querySelectorAll('div.page-item-detail, div.c-tabs-item__content');

        items.forEach(item => {
            const titleElement = item.querySelector('div.post-title h3 a, h3 a');
            const imgElement = item.querySelector('img');

            if (titleElement) {
                mangaList.push({
                    name: titleElement.textContent.trim(),
                    url: titleElement.getAttribute('href'),
                    thumbnail: imgElement ? (imgElement.getAttribute('data-src') || imgElement.getAttribute('src')) : ''
                });
            }
        });
        return mangaList;
    },

    // 3. Suche-Funktion
    getSearchRequest: (query, page) => {
        return `${source.baseUrl}/page/${page}/?s=${encodeURIComponent(query)}&post_type=wp-manga`;
    },

    // 4. Kapitel-Liste eines Mangas laden
    getChapterList: (html) => {
        const chapters = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('li.wp-manga-chapter');

        rows.forEach(row => {
            const link = row.querySelector('a');
            if (link) {
                chapters.push({
                    name: link.textContent.trim(),
                    url: link.getAttribute('href')
                });
            }
        });
        return chapters;
    },

    // 5. Bilder eines Kapitels laden (Reader)
    getPageList: (html) => {
        const pages = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const images = doc.querySelectorAll('div.reading-content img');

        images.forEach(img => {
            const url = img.getAttribute('data-src') || img.getAttribute('src');
            if (url) {
                pages.push(url.trim());
            }
        });
        return pages;
    }
};

// Wichtig für manche iOS-Umgebungen: Das Objekt am Ende aufrufen
source;
