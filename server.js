const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      HOST = '0.0.0.0';
      PORT = 3080;

const users = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/my-app/dist/angular-nodejs-example/"));

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/dist/angular-nodejs-example/index.html")
});

app.listen(PORT,HOST, () => {
    console.log(`Server listening on the port ${HOST}:${PORT}`);
});
