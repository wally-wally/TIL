// default
// 한 개의 파일에서 하나만 export 된다.

// util.js
export default function (x) {
  return console.log(x)
}

// main.js
import util from 'util.js'
console.log(util) // function (x) { return console.log(x); }
util('hi')

// app.js
import log from 'util.js'
console.log(log)
log('hi')