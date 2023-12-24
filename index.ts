let active: {
    name?: string
    route?: string
    next?: number
    status?: 'station' | 'going'
    dest?: boolean
}[] = [
    {
        name: 'jani',
        route: 'm3',
        next: 20,
        status: 'going',
        dest: true,
    },
]

import './src/scripts/connect'

await Bun.build({
    entrypoints: ['./src/scripts/connect.ts'],

    outdir: './public/scripts',
})

const server = Bun.serve({
    port: 3000,
    development: true,
    async fetch(req) {
        const url = new URL(req.url)
        if (url.pathname === '/style') {
            return new Response(Bun.file('public/output.css'))
        } else if (url.pathname === '/') {
            return new Response(Bun.file('src/index.html'))
        } else if (url.pathname === '/about') {
            return new Response(Bun.file('src/about.html'))
        } else if (url.pathname === '/connect') {
            return new Response(Bun.file('src/connect.html'))
        } else if (url.pathname.startsWith('/js')) {
            return new Response(
                Bun.file('public/scripts' + url.pathname.split('js')[1] + '.js')
            )
        } else if (url.pathname === '/ws') {
            if (server.upgrade(req)) {
                return
            }
        } else {
            return new Response(Bun.file('src/404.html'))
        }
    },
    websocket: {
        message(ws, message) {
            if (message === 'getKords') {
                ws.send('backKords/' + JSON.stringify(active))
            }
        },
    },
})

console.log('http://localhost:' + server.port)
