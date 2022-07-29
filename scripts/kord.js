const express = require("express");
const exec = require('child_process').exec;
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const fs = require('fs');
let asd;
let opened = false;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let sql;
let routenames = [];
let routelast = [];
const db = new sqlite3.Database('./kord.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

function refresh(){
      sql = `SELECT * FROM routes`
      db.all(sql,[], (err,rows) => {
            if (err) return console.error(err.message)
            rows.forEach((row) => {
                  routenames = []
                  routelast = []
                  routenames.push(row.name)
                  routelast.push(row.last)
            })
      })
      setTimeout(()=> {refresh()},1000)
}

function savelast(id){
      let sanyi = routelast[asd]
            fs.writeFile('assets/saves/routelast-'+ id + '.txt', sanyi.toString(), (err) => {
                  // throws an error, you could also catch it here
                  if (err) throw err;
              });
              setTimeout(()=> {savelast(id)},1000)
}

router.get('/', async(req,res) => {
      res.send("Kérlek add meg a járatszámot!")
})

router.get('/adm/:id', async(req, res) =>{
      id = req.params.id
      res.render("adm", { title: id})
})

router.get('/:id/:route', async(req, res) =>{
      let id = req.params.id
      let route = req.params.route
      refresh()
      setTimeout(() => {
            if(routenames.includes(id) == false) return res.send("Ilyen nincs!")
            for (let i = 0; i < routenames.length; i++) {
                  if(routenames[i] == id){
                        asd = i;
                        break;
                  }
            }
            
            savelast(id)
            res.render("main", { title: route, routename: id,laststat: routelast[asd]})
      },1000)
})

module.exports = router