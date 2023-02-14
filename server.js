const http = require('http');

const server = http.createServer((req, res) => {
    console.log('req server')
    res.write('hello')
    res.end();
})

server.listen(3000, 'localhost', () => {
    console.log('listening port 3000')
})