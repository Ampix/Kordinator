const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '130.61.120.32',
  user: 'kordi',
  password: 'kecske.kecske',
  database: 'realcast_kordinator'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", 'ejs')
app.set("views", "oldalak")

app.use(express.static("assets"))
app.use(express.urlencoded({extended: true}))

const cord = require('./scripts/kord')

app.use('/kord', cord)

app.listen(port);
console.log("http://localhost:"+port)