const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { name: 'Dav-ok', role: 'Owner' },
  { name: 'Ada', role: 'Designer' },
  { name: 'Chidi', role: 'Developer' },
  { name: 'Okechukwu', role: 'Manager' },
  { name: 'Bidemi', role: 'Engineer' }
];

app.get('/', (req, res) => {
  res.send(`
  <html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>
  body{background:#22c55e;color:white;font-family:sans-serif;text-align:center;padding:20px}
  h1{color:#000000}
  .card{background:black;color:white;padding:15px;margin:10px;border-radius:12px;text-align:left}
  input{padding:12px;margin:5px;border-radius:8px;border:none;width:80%;font-size:16px}
  button{padding:12px 20px;margin:10px;border-radius:8px;border:none;background:black;color:white;font-size:16px}
  </style></head><body>
  <h1>Dav-ok Team - Day 13</h1>
  <p>Real app - Add users from here!</p>
  <input id="name" placeholder="Enter name">
  <input id="role" placeholder="Enter role">
  <br><button onclick="addUser()">Add User</button>
  <div id="list"></div>
  <script>
  async function load(){
    let r = await fetch('/api/users');
    let data = await r.json();
    document.getElementById('list').innerHTML = data.map(u => '<div class="card"><b>'+u.name+'</b><br>'+u.role+'</div>').join('');
  }
  async function addUser(){
    let name = document.getElementById('name').value;
    let role = document.getElementById('role').value;
    if(name === '' || role === ''){
      alert('Type name and role first!');
      return;
    }
    await fetch('/api/users', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name:name, role:role})});
    document.getElementById('name').value = '';
    document.getElementById('role').value = '';
    load();
  }
  load();
  </script></body></html>`);
});

app.get('/api/users', (req, res) => { res.json(users); });

app.post('/api/users', (req, res) => {
  users.push(req.body);
  res.json({ok:true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running on ' + PORT));
