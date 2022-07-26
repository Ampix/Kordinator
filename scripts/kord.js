const express = require("express")
const router = express.Router()
const ids = ["8E"]

router.get('/', (req,res) => {
      res.send("Kérlek add meg a járatszámot!")
})

router.get('/adm/:id', (req, res) =>{
      id = req.params.id
      if(!ids.includes(id)) return res.send("Ilyen nem létezik!")
      res.render("adm", { title: id})
})

router.get('/:id', (req, res) =>{
      id = req.params.id
      if(!ids.includes(id)) return res.send("Ilyen nem létezik!")
      res.render("main", { title: id})
})

module.exports = router