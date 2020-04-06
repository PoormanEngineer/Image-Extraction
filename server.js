const http = require('http');
const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const imageSrcGetter = require('./ImageSrcGetter.js');

const imageExtractionEjs = fs.readFileSync('./Image-Extraction.ejs', 'utf-8');

const server = http.createServer();

server.on('request', function(req, res) {
    let url_parse   = url.parse(req.url, true);
    let params      = url_parse.query;

    // console.log(url_parse);
    console.log(params);

    if(url_parse.pathname === '/Image-Extraction') {
        let msg = '';
        let imgTags = '';

        if(params.url != null) {
            imgTags = imageSrcGetter.get(params);

            if(imgTags === '') {
                msg = '画像が取得できませんでした';
            }
        }

        let resultHtml = ejs.render(imageExtractionEjs, {imgTags: imgTags, msg: msg});

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(resultHtml);
        res.end();
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Page not found.');
        res.end();
    }
});

server.listen(8080);
