const button = document.getElementById('nextstat');
const herebutton = document.getElementById('here');
const route = document.getElementById("route").innerHTML
const socket = io("http://localhost:3000");
let clicked = false;
button.addEventListener('click', function(e) {
  if(!clicked){
    clicked = true
    fetch('/kord/nextstat/' + route, {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
    setTimeout(()=>{socket.emit('plays', "go")},500)
    setTimeout(() => {
      clicked = false
    }, 1000);
  }else{
    console.log("Can't click")
  }
  
  
});

herebutton.addEventListener('click', function(e) {
  if(!clicked){
    clicked = true
    setTimeout(()=>{socket.emit('plays', "normal")},500)
    setTimeout(() => {
      clicked = false
    }, 1000);
  }else{
    console.log("Can't click")
  }
    
});
