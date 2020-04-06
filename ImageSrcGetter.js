const request = require('sync-request');
const cheerio = require('cheerio');

module.exports = {
    get: function(params) {
        let targetUrl   = params.url;
        let minWidth    = params.minWidth;
        let minHeight   = params.minHeight;
        let containsGif = params.containsGif;

        let res = request('GET', targetUrl);

        let $ = cheerio.load(res.getBody());

        let imgUrls = $('img').get().map(img => {
            return img.attribs.src.split('?')[0];
        });

        if(!containsGif) {
            imgUrls = imgUrls.filter(img => !img.endsWith('.gif'));
        }

        let imgTags = '';
        
        imgUrls.forEach(function(url) {
            imgTags += '<img src="url" />'.replace('url', url);
        });

        return imgTags;
    }
}
