const express = require("express");
const nodemon = require("nodemon");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
const app = express();
const port = 5500;
const sqlite3 = require('sqlite3').verbose();
let sql;
let routes = [];
const db = new sqlite3.Database('./kord.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

sql = `INSERT INTO routes(name,last) VALUES ('harcsi', 3)`

//db.run(sql)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", 'ejs')
app.set("views", "oldalak")

app.use(express.static("assets"))
app.use(express.urlencoded({extended: true}))

const cord = require('./scripts/kord')

app.use('/kord', cord)

app.listen(port);
console.log("localhost:"+port)