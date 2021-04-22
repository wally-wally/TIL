let josh = {
  field: 'web',
  language: 'js'
}

// ES5
// let developer = {
//   nation: 'korea',
//   field: josh.field,
//   language: josh.language
// }

// ES6
let developer = {
  nation: 'korea',
  ...josh
}

console.log(developer)