let laststat = false
            function currentstat(){
                  const stat = document.getElementById("vonalak").firstElementChild
                  stat.classList.add("current")
                  if(laststat){
                        laststat.classList.remove("current")
            };
            }
            function nextstat(){
                  const node = document.getElementById("vonalak").firstElementChild;
                  node.remove()
                  currentstat()
            }
            
            const route = document.getElementById("route").innerHTML
            if(route === "8E"){
                  let állomások = ["Újpalota, Nyírpalota út", "Vásárcsarnok", "Fő tér", "Apolló utca", "Molnár Viktor utca", "Cinkotai út", "Bosnyák tér", "Tisza István tér", "Zugló vasútállomás", "Keleti pályaudvar M"]
                  const node = document.getElementById("vonalak").lastElementChild;
                  for (let i = 1; i < állomások.length; i++) {
                        const clone = node.cloneNode(true);
                        clone.id = i
                        document.getElementById("vonalak").appendChild(clone);
                  };
                  for (let i = 0; i < állomások.length; i++) {
                        karcsi = document.getElementById(i);
                        karcsi.innerHTML = állomások[i]
                  };
                  currentstat()

            }