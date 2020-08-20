// (9) 제네릭(generics) 타입
// 배열을 다루는 함수를 작성할 때는 number[]와 같이 타입이 고정된 함수를 만들기보다는
// T[] 형태로 배열의 아이템 타입을 한꺼번에 표현하는 것이 편리하다.
// 타입을 T와 같은 일종의 변수(타입 변수)로 취급하는 것을 제네릭 타입이라고 한다.

export const arrayLength = <T>(array: T[]): number => array.length
export const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) === 0

// 위 코드와 같이 컴파일러가 T의 의미를 알게 하기 위해서 <T>를 사용해서 작성한다.
// 즉, T가 타입 변수라고 알려줘야 하는 것이다.