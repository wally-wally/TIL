const str = 'To lose your path is the way to find that path';

const regex1 = /path/;
const regex2 = /q/;
const regex3 = /t/g;
const regex4 = /t/ig;

console.log(str.search(regex1));
console.log(str.search(regex2));
console.log(str.search(regex3));
console.log(str.search(regex4));