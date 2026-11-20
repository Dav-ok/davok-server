const http = require('http');
const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "Dav-ok", role: "Developer" },
  { id: 2, name: "Ada", role: "Designer" },
  { id: 3, name: "Chidi", role: "Backend" },
  { id: 4, name: "Okechukwu", role: "Full Stack" }
];

const html = `
<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>
body{font-family:sans-serif;background:#22e55c;color:white;padding:20px;text-align:center}
.card{background:white;color:black;padding:15px;margin:10px;border-radius:12px;text-align:left}
h1{color:#000000}
</style></head><body>
<h1>Dav-ok Team - Day 12</h1>
<p>Live data from /api/users</p>
<div id="list">Loading...</div>
<script>
fetch('/api/users').then(r=>r.json()).then(users=>{
  document.getElementById('list').innerHTML = users.map(u=>'<div class="card"><b>'+u.name+'</b><br>'+u.role+'</div>').join('');
});
</script>
</body></html>
`;

http.createServer((req, res) => {
  if (req.url === '/api/users') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users));
  } else if (req.url === '/api/hello') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: "Hello from Dav-ok API - Day 11", status: "live"}));
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }
}).listen(port, () => console.log('Running on ' + port));
