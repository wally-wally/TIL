window.onload = function() {
  let req = new XMLHttpRequest();
  req.addEventListener('load', function() {
    let jsonData = JSON.parse(req.responseText);
    jsonData.forEach(data => {
      document.querySelector('#app').innerHTML += `<p>${data.title}</p>`
    });
  })
  req.open('GET', './data.json');
  req.send(null);
}