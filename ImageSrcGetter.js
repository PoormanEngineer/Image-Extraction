const request = require('request');
const cheerio = require('cheerio');

let options = {
    url: '',
    method: 'GET'
}

module.exports = {
    get: function(targetUrl) {
        options.url = targetUrl;
        
        console.log('sendRequest : ' + options.url);

        let imgUrls = null;
        
        request(options, function(error, response, body){
            const $ = cheerio.load(body);

            imgUrls = $('img').get().map(img => {
                return img.attribs.src.split('?')[0];
            })
            .filter(url => !url.endsWith('.gif'));

            console.log(imgUrls);

            imgUrls.forEach(function(url) {
            });
        });
    }
}
