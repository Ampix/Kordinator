let állomások = []
let lastlaststat = 0;
let first = true;
let statcol;

const socket = io("http://localhost:3000");
//const socket = new WebSocket('ws://localhost:8080')

function currentstat(){
      const stat = document.getElementById("vonalak").firstElementChild.nextElementSibling
      stat.classList.add(statcol)
};

socket.on('getstat', message => {
            if(first){
                  build(message)
                  load()
                  first = false
            }else if(lastlaststat != message){
                  rebuild(message)
            }
            setTimeout(() => {
                  socket.emit("refresh")
            }, 1000);
      
})

socket.on('plays', type => {
      setTimeout(() => {
            if(type == "normal"){
                  console.log(`Play http://localhost:5500/sounds/${route}/${lastlaststat}.wav`)
                  var audio = new Audio(`http://localhost:5500/sounds/${route}/${lastlaststat}.wav`);
                  audio.play();
            }
            if(type == "go"){
                  console.log(`Play http://localhost:5500/sounds/${route}/${lastlaststat}-go.wav`)
                  var audio = new Audio(`http://localhost:5500/sounds/${route}/${lastlaststat}-go.wav`);
                  audio.play();
            }
      }, 1000);  
})

function load(){
      const node = document.getElementById("routeplace");
      node.classList.add(statcol)
}

function build(laststat){
      lastlaststat = laststat
      const node = document.getElementById("vonalak").firstElementChild;
      for (let i = laststat; i < állomások.length; i++) {
            const clone = node.cloneNode(true);
            clone.id = i
            clone.classList.remove("hide")
            document.getElementById("vonalak").appendChild(clone);
      };
      for (let i = laststat; i < állomások.length; i++) {
            karcsi = document.getElementById(i);
            karcsi.innerHTML = állomások[i]
      };
      currentstat()
}

function rebuild(laststat){
      if(laststat != lastlaststat){
            for (let i = lastlaststat; i < állomások.length; i++) {
                  const node = document.getElementById("vonalak").lastElementChild;
                  if(node.id != "teszt"){
                        node.remove()
                  }
            };
            build(laststat)
            lastlaststat = laststat
      }
}

const route = document.getElementById("route").innerHTML
const routename = document.getElementById("routename").innerHTML

if(route === "8E"){
      állomások = ["Újpalota, Nyírpalota út", "Vásárcsarnok", "Fő tér", "Apolló utca", "Molnár Viktor utca", "Cinkotai út", "Bosnyák tér", "Tisza István tér", "Zugló vasútállomás", "Keleti pályaudvar M"]
      statcol = "bg-cyan-400"
}
if(route === "M3"){
      állomások = ["Újpest-Központ", "Újpest-Városkapu", "Gyöngyösi utca", "Forgách utca", "Árpád híd", "Dózsa György út", "Lehel tér", "Nyugati pályaudvar", "Arany János utca", "Deák Ferenc tér", "Ferenciek tere", "Kálvin tér", "Ferenc körút", "Semmelweis Klinikák", "Nagyvárad tér", "Népliget", "Ecseri út", "Pöttyös utca", "Határ út", "Kőbánya-Kispest"]
      statcol = "bg-blue-600"
}