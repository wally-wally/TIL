const numbers = [1, 2, 3, 4]

console.log(numbers[0]) // 1이 출력
console.log(numbers[-1]) // undefined가 출력(정확한 양의 정수 index만 가능)
console.log(numbers.length) // 4가 출력

// reverse()는 원본 파괴됨
console.log(numbers.reverse()) // 배열 뒤집기
console.log(numbers)
console.log(numbers.reverse()) // 한 번더 반복하면 원상복구됨

// push : 배열의 길이를 return
console.log(numbers.push('a'))
console.log(numbers)

// pop : 배열의 가장 마지막 요소 제거 후 return
console.log(numbers.pop())
console.log(numbers)

// unshift : 배열의 가장 앞에 요소를 추가하고 배열의 길이를 return
console.log(numbers.unshift('a'))
console.log(numbers)

// shift : 배열의 가장 앞에 요소를 제거 후 return
console.log(numbers.shift())
console.log(numbers)

// includes : 배열에 요소가 있으면 true, 없으면 false를 return(boolean return)
console.log(numbers.includes(1))
console.log(numbers.includes(0))

// indexOf : 중복이 존재한다면 처음 찾은 요소의 index를 return
console.log(numbers.push('a', 'a')) // 현재 배열 상태 : [1, 2, 3, 4, 'a', 'a']
console.log(numbers)
console.log(numbers.indexOf('a')) // 4가 출력
console.log(numbers.indexOf('b')) // 찾고자하는 요소가 없으면 -1을 return

// join : 배열의 요소를 join 함수의 인자를 기준으로 이어서 문자열로 return
console.log(numbers.join()) // '1,2,3,4,a,a'로 출력 (아무것도 넣지 않으면 , 를 기준으로 가져옴)
console.log(numbers.join('')) // '1234aa'로 출력
console.log(numbers.join('-')) // '1-2-3-4-a-a'로 출력
console.log(numbers) // join은 원본을 변화시키지 않는다.