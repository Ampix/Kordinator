const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
let asd;
const mysql = require('mysql2');
const WebSocket = require("ws")
const server = new WebSocket.Server({port: '8080'})

server.on('connection', socket => {
      refresh(false)
      socket.send(routelast[asd])
      socket.on('message', message => {
            if(message == "refresh"){
                  socket.send(routelast[asd])
            }
      })
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

let routenames = [];
let routelast = [];

const connection = mysql.createConnection({
      host: '79.139.61.25',
      user: 'realcast_kordi',
      password: 'kecske.kecske',
      database: 'realcast_kordinator'
    });

function refresh(id){
      connection.query(
            'SELECT * FROM `routes`',
            function(err, results) {
                  if(err) return console.error(err.message)
              results.forEach((row) => {
                  routenames = []
                  routelast = []
                  routenames.push(row.name)
                  routelast.push(row.last)
              })
            if(id){

            
              for (let i = 0; i < routenames.length; i++) {
                  if(routenames[i] == id){
                        asd = i;
                        break;
                  }
            }
      }
            }
          );
          
      
      setTimeout(()=> {refresh(id)},1000)
}

router.get('/', async(req,res) => {
      res.send("Kérlek add meg a járatszámot!")
})

router.get('/adm/:id', async(req, res) =>{
      id = req.params.id
      refresh(id)
      setTimeout(() => {
            if(routenames.includes(id) == false) return res.send("Ilyen nincs!")
            res.render("adm", { title: id})
      },100)
})

router.post('/nextstat/:id', (req,res)=> {
      id = req.params.id
      refresh(id)
      setTimeout(() => {
            gazdi = routelast[asd]
            connection.query(
                  'UPDATE routes SET last = ? WHERE name = ?',
                  [gazdi+1, id],
                  function(err, results) {
                        if(err) return console.error(err.message)
                  }
                ); 
      }, 100);
      
})

router.get('/:id/:route', async(req, res) =>{
      let id = req.params.id
      let route = req.params.route
      refresh(id)
      setTimeout(() => {
            if(routenames.includes(id) == false) return res.send("Ilyen nincs!")
            res.render("main", { title: route, routename: id})
      },100)
})

module.exports = router