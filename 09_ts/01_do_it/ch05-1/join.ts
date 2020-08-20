// (4) 문자열과 배열 간 변환 - join
// string[] 타입의 배열을 다시 string 타입으로 변환하려면
// Array 클래스의 join 메서드를 사용한다.

// 아래 join 함수는 매개변수로 받은 string[] 타입 배열과 구분자(delim)를 이용해
// String 클래스의 join 메서드를 호출해서 문자와 구분자를 결합한 새 문자열을 반환한다.
export const join = (strArr: string[], delim: string = ''): string => strArr.join(delim)