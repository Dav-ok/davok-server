const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let team = [];
try { team = JSON.parse(fs.readFileSync('team.json', 'utf8')); }
catch (e) {
  team = [
    { name: "Dav-ok", role: "Owner" },
    { name: "Ada", role: "Designer" },
    { name: "Chidi", role: "Developer" },
    { name: "Okechukwu", role: "Manager" },
    { name: "Bidemi", role: "Engineer" },
    { name: "Dav-ok", role: "Founder" }
  ];
}
function saveTeam(){ fs.writeFileSync('team.json', JSON.stringify(team, null, 2)); }

app.get('/', (req, res) => {
  const list = team.map((m, i) => `
    <div style="background:white;padding:16px;border-radius:16px;margin:12px 0;box-shadow:0 4px 12px rgba(0,0,0,0.1);text-align:left;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:18px;font-weight:800;color:#111;">${m.name}</div>
          <div style="color:#666;font-size:14px;">${m.role}</div>
        </div>
        <div style="background:#22c55e;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;">${m.name[0]}</div>
      </div>
      <form method="POST" action="/edit" style="margin-top:12px;display:flex;gap:6px;">
        <input type="hidden" name="index" value="${i}">
        <input name="name" value="${m.name}" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:8px;">
        <input name="role" value="${m.role}" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:8px;">
        <button style="background:#111;color:white;border:none;padding:8px 12px;border-radius:8px;">Save</button>
      </form>
      <form method="POST" action="/delete">
        <input type="hidden" name="index" value="${i}">
        <button style="background:#fee2e2;color:#dc2626;border:none;padding:7px 12px;border-radius:8px;margin-top:8px;width:100%;">Delete</button>
      </form>
    </div>`).join('');

  res.send(`
    <body style="margin:0;font-family:sans-serif;background:#f0fdf4;">
      <div style="background:#111;color:white;padding:24px 20px 30px;text-align:center;border-radius:0 0 24px 24px;">
        <div style="font-size:28px;font-weight:900;">Dav-ok<span style="color:#22c55e;">.</span></div>
        <div style="opacity:0.7;font-size:14px;">Team Manager • Day 15</div>
        <div style="background:#22c55e;display:inline-block;padding:6px 14px;border-radius:20px;margin-top:12px;font-size:13px;font-weight:700;">${team.length} Members • Live</div>
      </div>
      <div style="max-width:480px;margin:0 auto;padding:16px;">
        <div style="background:white;padding:16px;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <b>Add New Member</b>
          <form method="POST" action="/add" style="margin-top:10px;">
            <input name="name" placeholder="Enter name" style="width:100%;padding:11px;border:1px solid #ddd;border-radius:10px;margin:4px 0;box-sizing:border-box;">
            <input name="role" placeholder="Enter role" style="width:100%;padding:11px;border:1px solid #ddd;border-radius:10px;margin:4px 0;box-sizing:border-box;">
            <button style="background:#22c55e;color:white;width:100%;padding:12px;border:none;border-radius:10px;font-weight:800;margin-top:6px;">+ Add User</button>
          </form>
        </div>
        ${list}
        <p style="text-align:center;color:#999;font-size:12px;">Built by Dav-ok • Full CRUD App</p>
      </div>
    </body>
  `);
});

app.post('/add', (req, res) => {
  if(req.body.name && req.body.role){ team.push({name:req.body.name, role:req.body.role}); saveTeam(); }
  res.redirect('/');
});
app.post('/delete', (req, res) => { team.splice(req.body.index, 1); saveTeam(); res.redirect('/'); });
app.post('/edit', (req, res) => {
  const i = req.body.index;
  if(team[i] && req.body.name && req.body.role){ team[i] = {name:req.body.name, role:req.body.role}; saveTeam(); }
  res.redirect('/');
});
app.get('/team', (req, res) => res.json(team));
app.listen(PORT, () => console.log('Live on ' + PORT));
