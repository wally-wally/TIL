// Curly brackets enable precise specification of character repetitions.
// {m} matches precisely m times, {m,n} matches minimaly m times and maximaly n times and {m,} matches minimaly m times.

const str1 = 'One ring to bring them all and in the darkness bind them';

// 어떤 문자가 5자인 것을 검출
// 단, g 플래그일 때는 앞에서부터 5개씩 묶었을 때 한 글자가 남게 된다.
console.log(str1.match(/.{5}/));
console.log(str1.match(/.{5}/g));

// e나 l이나 s가 1글자 이상 3글자 이하인 경우
console.log(str1.match(/[els]{1,3}/));
console.log(str1.match(/[els]{1,3}/g));

// 영어 알파벳 소문자가 3글자 이상인 경우
console.log(str1.match(/[a-z]{3,}/));
console.log(str1.match(/[a-z]{3,}/g));
