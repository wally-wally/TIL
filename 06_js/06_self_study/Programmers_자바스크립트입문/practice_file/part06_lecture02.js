var arr = [1, 2, 3, 4, 5];

console.log(arr.pop()); // pop : 맨 마지막 element를 뽑아낸다.
console.log(arr);

console.log(arr.shift()); // shift : pop과 반대로 맨 앞의 element를 뽑아낸다.
console.log(arr);

console.log(arr.push(6)); // push : 맨 마지막에 element 추가
console.log(arr);

console.log(arr.unshift(0)); // unshift : 맨 앞에 element 추가
console.log(arr);

console.log(arr.reverse()); // reverse : 배열 안의 요소들을 거꾸로 뒤집음
console.log(arr);

console.log(arr.sort()); // sort : 배열 안의 요소들을 정렬함
console.log(arr);

var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];

console.log(arr1.concat(arr2)); // 이때 arr1, arr2에는 각각 변화가 없다.
var arr3 = arr1.concat(arr2); // 변화된 값을 저장하기 위해 새로운 변수를 선언해야 한다.
console.log(arr1, arr2);
console.log(arr3);

var arr4 = [1, 2, 3, 1, 2, 3];

console.log(arr4.indexOf(2)); // 문자열과 동일
console.log(arr4.lastIdexOf(2)); // 문자열과 동일

var str = "1, 2, 3, 4, 5";
console.log(str.split(",")); // split 안에는 구분자를 넣어 구분자에 의해 배열의 각 요소로 넣어진다.