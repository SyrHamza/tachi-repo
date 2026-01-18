const extension = {
    name: "ManhwaRead",
    baseUrl: "https://manhwaread.com",
    lang: "en",
    nsfw: 1,

    // Suche und Startseite
    getLatestRequest: (page) => `${extension.baseUrl}/manga/page/${page}/?m_order=latest`,
    getSearchRequest: (query, page) => `${extension.baseUrl}/page/${page}/?s=${query}&post_type=wp-manga`,

    // Parser für die Liste (Nutzt deine Selektoren)
    parseMangaList: (html) => {
        const results = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('div.c-tabs-item__content').forEach(item => {
            results.push({
                name: item.querySelector('div.post-title h3 a').textContent.trim(),
                url: item.querySelector('div.post-title h3 a').getAttribute('href'),
                thumbnail: item.querySelector('img.img-responsive').getAttribute('src')
            });
        });
        return results;
    },

    // Kapitel-Parser
    parseChapterList: (html) => {
        const chapters = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('li.wp-manga-chapter').forEach(ch => {
            const link = ch.querySelector('a');
            chapters.push({
                name: link.textContent.trim(),
                url: link.getAttribute('href')
            });
        });
        return chapters;
    },

    // Bilder-Parser (für die Seiten im Kapitel)
    parsePageList: (html) => {
        const pages = [];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('div.page-break img').forEach(img => {
            pages.push(img.getAttribute('src').trim());
        });
        return pages;
    }
};

module.exports = extension;
