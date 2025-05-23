const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const STATIC_FOLDER = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    let filePath = path.join(STATIC_FOLDER, req.url === '/' ? 'index.html' : req.url);
    
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            serve404();
        } else {
            serveFile(filePath, contentType);
        }
    });

    function serveFile(filePath, contentType) {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    serve404();
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

    function serve404() {
        const notFoundPath = path.join(STATIC_FOLDER, '404.html');
        fs.readFile(notFoundPath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}/`);
});