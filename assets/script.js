let állomások = []
let lastlaststat = 0;
let first = true;

const socket = new WebSocket('ws://localhost:8080')

function currentstat(){
      const stat = document.getElementById("vonalak").firstElementChild.nextElementSibling
      stat.classList.add("bg-blue-400")
};

socket.onmessage = ({data}) => {
      if(first){
            build(data)
            first = false
      }else{
            rebuild(data)
      }
      setTimeout(() => {
            socket.send("refresh")
      }, 1000);
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
}