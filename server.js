const http = require('http');
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello from Dav-ok\'s Cloud - Day 10</h1><p>Plan B - No card needed</p>');
}).listen(port, () => console.log('Running on ' + port));
