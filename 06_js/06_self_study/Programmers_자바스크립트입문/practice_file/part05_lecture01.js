var str="Hello";
var str1="Star", str2="Craft";

console.log(str.length, str["length"]);
console.log("Hello".length);
console.log(str1.concat(str2));

var str3=str1.concat(str2);
console.log(str3);

var str4=str1.concat(str2).concat("!");
console.log(str4);

var str5="Star".concat("Craft").concat("!");
console.log(str5);

var str6="Star"+"Craft";
var str7 =str1+str2;
console.log(str6, str7);

var str8="Pi is "+3.14;
var str9=3.14+" is Pi";
console.log(str8);
console.log(str9);