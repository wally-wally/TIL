let string = "Respect yourself and others will respect you."
let string2 = "We aim above the mark to hit the mark."
let string3 = "Don't find fault, find a remedy."

console.log(string.length)
console.log(string.charAt(3))
console.log(string.concat(string2))
console.log(string.concat(string2, string3))
console.log(string.concat(string2).concat(string3))
console.log(string.includes('c'))
console.log(string.includes(','))
console.log(string.indexOf('y'))
console.log(string.lastIndexOf('y'))
console.log(string.repeat(2))
console.log(string.replace('Respect', 'Good'))
console.log(string.slice(4))
console.log(string.slice(1, 4))
console.log(string3.slice(-4))
console.log(string3.slice(-4, -1))
console.log(string.split(' '))
console.log(string.split(' ', 3))
console.log(string2.startsWith('aim'))
console.log(string2.startsWith('aim', 3))
console.log(string.substring(3, 5))
console.log(string.substring(-5, -3)) // substring은 slice와 다르게 음수 불가능
console.log(string3.toLowerCase())
console.log(string3.toUpperCase())
console.log(string.trim())