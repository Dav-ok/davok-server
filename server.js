const http = require('http');
const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "Dav-ok", role: "Developer" },
  { id: 2, name: "Ada", role: "Designer" },
  { id: 3, name: "Chidi", role: "Backend" }
];

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/api/hello') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ message: "Hello from Dav-ok API - Day 11", status: "live" }));
  }
  else if (req.url === '/api/users') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users));
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Dav-ok Server - Day 11</h1><p>Try <a href="/api/hello">/api/hello</a> and <a href="/api/users">/api/users</a></p>');
  }
}).listen(port, () => console.log('Running on ' + port));
