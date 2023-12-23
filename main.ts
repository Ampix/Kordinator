// @deno-types="npm:@types/express"
import express from "npm:express"

const app = express()
const port = 8080

const dir = import.meta.url.split("main.ts")[0].split("file:///")[1].slice(undefined,-1)

app.get("/",(_req,res) => {
  res.sendFile(dir + "/pages/index.html")
})

app.listen(port,() => {
  console.log("http://localhost:" + port);
})