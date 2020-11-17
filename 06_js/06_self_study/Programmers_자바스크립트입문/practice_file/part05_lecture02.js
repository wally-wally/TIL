var str="abcdeabcde";

console.log(str.charAt(0)); // 시작 위치는 0
console.log(str.charAt(9));
console.log(str.charAt(10));
console.log(str.charAt(-1));
console.log(str[0]);
console.log(str[9]);
console.log(str[10]); // 위와 달리 undefined 반환
console.log(str[-1]); // 위와 달리 undefined 반환, 가급적 이 방법 사용

console.log(str.substring(2,4)); // 2번째 위치부터 4번째 위치 전까지 문자열 반환
console.log(str.substring(2)); // 2번째 위치부터 끝까지의 문자열 반환
console.log(str.substr(2,4)); // 2번째 위치부터 길이가 4인 string 반환
console.log(str.substr(2)); // substring(2)와 출력 동일
console.log(str.substr(-7)); // 맨 뒤를 -1로 볼 때 맨 뒤에서부터 7번째 앞에 있는 문자열부터 끝까지 string 반환
console.log(str.substr(-7,2)); // -7번째 위치부터 길이가 2인 string 반환

console.log(str.indexOf("bc")); // 문자열에서 "bc"가 있는 위치 반환
console.log(str.lastIndexOf("bc")); // 문자열에서 "bc"가 있는 마지막 위치 반환
console.log(str.indexOf("f")); // 존재하지 않는 문자열을 입력하면 -1 반환
console.log(str.lastIndexOf("f")); // 존재하지 않는 문자열을 입력하면 -1 반환