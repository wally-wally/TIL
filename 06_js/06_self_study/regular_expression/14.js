// '14.js' 는 다소 어려울 수 있기 때문에 지금까지 학습한 내용을 충분히 복습한 후 보시기 바랍니다.

const str1 = 'One ring to bring them all and in the darkness bind them';

// 알파벳 r 뒤에 모두 해당
console.log(str1.match(/r.*/));
console.log(str1.match(/r.*/g));

// 수량자 뒤에 물음표(?)가 오면 기존의 물음표 의미와 달라진다.
// '*?' => *이 0, 1, all을 모두 포함하는데 ?로 인해서 0만 해당하게 된다.
// 그래서 이 경우에는 any character(.)는 사용되지 않게 된다.
console.log(str1.match(/r.*?/));
console.log(str1.match(/r.*?/g));

console.log(str1.match(/r.+/));
console.log(str1.match(/r.+/g));

// '+'는 1, all을 포함하는데 이 때 ?가 붙으면 all 의미가 없어지고 1 의미만 남게 된다.
// 그래서 r.+?는 r 뒤에 1글자가 오는 pattern을 검출하게 된다.
console.log(str1.match(/r.+?/));
console.log(str1.match(/r.+?/g));

console.log(str1.match(/r.?/));
console.log(str1.match(/r.?/g));

// 기존의 '?'는 0 또는 1을 의미하는데, 뒤에 ?가 붙었기 때문에 0 의미만 남게 된다.
console.log(str1.match(/r.??/));
console.log(str1.match(/r.??/g));


// ex) 수량자 + '?' 실제 사용 예시
const html = '<div>test</div><div>test2</div>';

// 탐욕적인(Greedy) 수량자
const reg1 = new RegExp('<div>.+</div>', 'g');
console.log(html.match(reg1)); // ["<div>test</div><div>test2</div>"] 형태로 선택됨

// 탐욕적인(Greedy) 수량자 해결 방법 => 게으른(Lazy) 수량자
const reg2 = new RegExp('<div>.+?</div>', 'g');
console.log(html.match(reg2)); // ["<div>test</div>", "<div>test2</div>"]
