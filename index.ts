let active: {name?:string,route?:string,next?:number,status?:"station"|"going",dest?:boolean}[] = []

const server = Bun.serve({
    port: 3000,
    development: true,
    async fetch(req) {
        const url = new URL(req.url)
        if(url.pathname === "/style"){
            return new Response(Bun.file("public/output.css"))
        }else if(url.pathname === "/"){
            return new Response(Bun.file("src/index.html"))
        }else{
            return new Response(Bun.file("src/404.html"))
        }
        
    },
    websocket: {
        message(ws, message) {
            
        },
    }
})

console.log("http://localhost:"+server.port);