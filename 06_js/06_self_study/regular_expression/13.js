const str1 = 'AA ABA ABBA ABBBA';

// AB*A === AB{0,}A
console.log(str1.match(/AB*A/));
console.log(str1.match(/AB*A/g));

// AB+A === AB{1,}A
console.log(str1.match(/AB+A/));
console.log(str1.match(/AB+A/g));

// AB?A === AB{0,1}A
console.log(str1.match(/AB?A/));
console.log(str1.match(/AB?A/g));
