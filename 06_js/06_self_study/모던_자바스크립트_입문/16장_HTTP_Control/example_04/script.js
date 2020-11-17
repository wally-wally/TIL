window.onload = function() {
  let req = new XMLHttpRequest();
  req.addEventListener('load', function() {
    let jsonData = req.response;
    jsonData.forEach(data => {
      document.querySelector('#app').innerHTML += `<p>${data.username}-${data.age} | ${data.favorite}</p>`
    });
  })
  req.responseType = 'json';
  req.open('GET', './data.json');
  req.send(null);
}