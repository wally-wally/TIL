// (3) 문자열과 배열 간 변환 - split
// 어떤 프로그래밍 언어는 문자열을 문자들의 배열로 간주한다.
// 하지만 TS에서는 문자 타입이 없고 문자열의 내용 또한 변경할 수 없다.
// 이러한 특징 때문에 문자열을 가공하려면 문자열을 배열로 전환해야 한다.
// 보통 문자열을 배열로 전환할 때는 String 클래스의 split 메서드를 사용한다.

// 아래 split 함수는 매개변수로 전달받은 문자열(str)과 구분자(delim)을 이용해
// String 클래스의 split 메서드를 호출함으로써 string[] 타입의 배열로 만들어 준다.
export const split = (str: string, delim: string = ''): string[] => str.split(delim)