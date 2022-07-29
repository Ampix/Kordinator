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

function refresh(id){
      sql = `SELECT * FROM routes`
      db.all(sql,[], (err,rows) => {
            if (err) return console.error(err.message)
            rows.forEach((row) => {
                  routenames = []
                  routelast = []
                  routenames.push(row.name)
                  routelast.push(row.last)
            })
            for (let i = 0; i < routenames.length; i++) {
                  if(routenames[i] == id){
                        asd = i;
                        break;
                  }
            }
      })
      
      setTimeout(()=> {refresh(id)},1000)
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
      setTimeout(() => {
            if(routenames.includes(id) == false) return res.send("Ilyen nincs!")
            res.render("adm", { title: id})
      },1000)
})

router.post('/nextstat/:id', (req,res)=> {
      id = req.params.id
      sql = `UPDATE routes SET last = ? WHERE name = ?`
      gazdi = routelast[asd]
      setTimeout(() => {
            db.run(sql, [gazdi+1,id], (err) => {
                  if(err) return console.error(err.message)
            })
      }, 500);
      
})

router.get('/:id/:route', async(req, res) =>{
      let id = req.params.id
      let route = req.params.route
      refresh(id)
      setTimeout(() => {
            if(routenames.includes(id) == false) return res.send("Ilyen nincs!")
            
            
            savelast(id)
            res.render("main", { title: route, routename: id,laststat: routelast[asd]})
      },1000)
})
module.exports = router