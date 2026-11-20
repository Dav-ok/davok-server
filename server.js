const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let team = [];
try {
  team = JSON.parse(fs.readFileSync('team.json', 'utf8'));
} catch (e) {
  team = [
    { name: "Dav-ok", role: "Owner" },
    { name: "Ada", role: "Designer" },
    { name: "Chidi", role: "Developer" },
    { name: "Okechukwu", role: "Manager" },
    { name: "Bidemi", role: "Engineer" }
  ];
}

function saveTeam() {
  fs.writeFileSync('team.json', JSON.stringify(team, null, 2));
}

app.get('/', (req, res) => {
  const list = team.map((m, i) => `
    <div style="background:black;color:white;padding:15px;border-radius:10px;margin:10px;">
      <b>${m.name}</b><br>${m.role}<br>
      <form method="POST" action="/delete" style="margin-top:8px;">
        <input type="hidden" name="index" value="${i}">
        <button style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;">Delete</button>
      </form>
    </div>`).join('');

  res.send(`
    <body style="background:#22c55e;font-family:sans-serif;text-align:center;padding:20px;">
      <h1>Dav-ok Team - Day 14</h1>
      <p>Real app - Add & Delete users!</p>
      <form method="POST" action="/add">
        <input name="name" placeholder="Enter name" style="padding:10px;width:80%;margin:5px;border-radius:8px;border:none;"><br>
        <input name="role" placeholder="Enter role" style="padding:10px;width:80%;margin:5px;border-radius:8px;border:none;"><br>
        <button style="background:black;color:white;padding:10px 20px;border:none;border-radius:8px;margin:10px;">Add User</button>
      </form>
      ${list}
    </body>
  `);
});

app.post('/add', (req, res) => {
  if (req.body.name && req.body.role) {
    team.push({ name: req.body.name, role: req.body.role });
    saveTeam();
  }
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  team.splice(req.body.index, 1);
  saveTeam();
  res.redirect('/');
});

app.get('/team', (req, res) => res.json(team));

app.listen(PORT, () => console.log('Live on ' + PORT));
