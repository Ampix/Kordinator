let állomások = []
let lastlaststat;
function currentstat(){
      const stat = document.getElementById("vonalak").firstElementChild.nextElementSibling
      stat.classList.add("bg-blue-400")
};

async function refresh(){
      fetch('http://localhost:5500/saves/routelast-'+ routename + '.txt')
            .then(response => response.text())
            .then((data) => {
                  rebuild(data)
            })
      setTimeout(()=> {refresh()},2000)
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
const last = document.getElementById("last").innerHTML

if(route === "8E"){
      állomások = ["Újpalota, Nyírpalota út", "Vásárcsarnok", "Fő tér", "Apolló utca", "Molnár Viktor utca", "Cinkotai út", "Bosnyák tér", "Tisza István tér", "Zugló vasútállomás", "Keleti pályaudvar M"]
      build(last)
      refresh()
}