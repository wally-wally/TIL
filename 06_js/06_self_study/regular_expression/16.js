// \W : \w와 정반대의 의미 (everything but alphanumeric plus "_")
// (=== [^A-z0-9_])

const str1 = 'AS _34:AS11.23  @#$ %12^*';

console.log(str1.match(/\W/))
console.log(str1.match(/\W/g));

console.log(str1.match(/\w/))
console.log(str1.match(/\w/g));