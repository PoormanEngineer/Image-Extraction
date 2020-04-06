let http = require('http');
let url = require('url');
let fs = require('fs');
let imageSrcGetter = require('./ImageSrcGetter.js');

let server = http.createServer();

server.on('request', function(req, res) {
    let url_parse = url.parse(req.url, true);
    let targetUrl = url_parse.query.url;

    console.log(url_parse);
    console.log(targetUrl);

    if(url_parse.pathname === '/Image-Extraction') {
        if(targetUrl == null) {
            fs.readFile('./Image-Extraction.html', 'utf-8', function(err, data) {
                if(err) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.write('Error');
                    res.end();
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        }
        else {
            imageSrcGetter.get(targetUrl);
            res.end();
        }
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Page not found.');
        res.end();
    }
});

server.listen(8080);
