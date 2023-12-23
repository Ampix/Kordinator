import express from 'express'

const app = express()
const port = 8080

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/pages/index.html")
})

app.listen(port,() => {
    console.log("http://localhost:" + port);
})