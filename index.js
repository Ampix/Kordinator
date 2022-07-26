const express = require("express");
const path = require("path");
var mysql = require('mysql');
const app = express();
const port = 5500;

var con = mysql.createConnection({
      host: "79.139.61.25",
      user: "realcast_kordi",
      password: "kecske.kecske",
      database: "realcast_kordinator"
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO lines (name, stations) VALUES ('8E', 'asd')";
      con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        
    });
    

app.set("view engine", 'ejs')
app.set("views", "oldalak")

app.use(express.static("assets"))
app.use(express.urlencoded({extended: true}))

const cord = require('./scripts/kord')

app.use('/kord', cord)

app.listen(port);
console.log("Fut")