const axios = require('axios') // JS에서 import하는 방법

axios.get('http://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log(response)
  })
  .catch(err => { // 요청이 잘못되었을 때
    console.log(err)
  })