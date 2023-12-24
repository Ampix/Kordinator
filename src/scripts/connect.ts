try {
    const socket: WebSocket = new WebSocket('ws://localhost:3000/ws')
    const selectables = document.getElementById('selectables')

    interface active {
        name: string
        route: string
        next: number
        status: 'station' | 'going'
        dest: boolean
    }

    socket.addEventListener('open', (event) => {
        socket.send('getKords')
    })

    socket.addEventListener('message', (event) => {
        if (event.data.toString().startsWith('backKords/')) {
            let cuccok: active[] = JSON.parse(
                event.data.toString().split('backKords/')[1]
            )
            cuccok.forEach((val) => {
                let div = document.createElement('div')
                selectables?.appendChild(div)
                div.classList.add('bg-slate-600')
                div.classList.add('flex')
                div.classList.add('flex-col')
                div.classList.add('gap-1')
                div.classList.add('p-2')
                div.classList.add('rounded-lg')
                let name = document.createElement('h1')
                name.innerText = val.name
                div.appendChild(name)
                let route = document.createElement('h2')
                route.innerText = val.route
                route.classList.add('text-gray-300')
                div.appendChild(route)
            })
        }
    })
} catch {}
