const express = require('express');
const os = require('os');
const path = require("path");
const app = express();
const index = path.join(__dirname, "./src/client/index.js");

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(8080, () => console.log('Listening on port 8080!'));
