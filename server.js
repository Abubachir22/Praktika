var http = require('http');
var fs = require('fs');
var path = require('path');
var server = http.createServer(function(req, res) {
    var file = req.url === '/' ? 'index.html' : req.url;
    var fullPath = path.join(__dirname, 'public', file);
    fs.readFile(fullPath, function(err, data) {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', '404.html'), function(_, notFoundData) {
                res.end(notFoundData);
            });
        } else {
            res.end(data);
        }
    });
});
server.listen(3000, function() {
    console.log('Сервер работает: http://localhost:3000/');
});