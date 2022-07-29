const button = document.getElementById('nextstat');
const route = document.getElementById("route").innerHTML
button.addEventListener('click', function(e) {
  console.log('button was clicked');

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
});
