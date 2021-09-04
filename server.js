// Import the dependencies
let http = require('http'),
    config = require('./config'),
    filehandler = require('./filehandler'),
    parse = require('url').parse,
    types = config.types,
    rootFolder = config.rootFolder,
    defaultIndex = config.defaultIndex,
    server;

module.exports = server = http.createServer();

server.on('request', onRequest)

// That's function invite the filehandler to up the server
// when the server started
function onRequest(req, res) {
    let filename = parse(req.url).pathname,
        fullPath,
        extension;
    
    if(filename === '/') filename = defaultIndex;

    fullPath = rootFolder + filename;
    extension = filename.substr(filename.lastIndexOf('.') + 1);

    filehandler(fullPath, (data) => {
        res.writeHead( 200, {
            'Content-Type': types[extension] || 'text/plain',
            'Content-Length': data.length
        });
        res.end(data);

    }, (err) => {
        res.writeHead(404);
        console.log(err)
        res.end()
    });
}
