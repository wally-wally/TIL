// (5) 인덱스 연산자
// 배열이 담고 있는 원소 중 특정 위치에 있는 원소를 얻고자 할 때는 인덱스 연산자를 사용한다.
// 기존의 Javascript 에서 구현할 때와 유사

const strings: string[] = ['a', 'b', 'c', 'd']
for (let i = 0; i < strings.length; i++) {
  const item: string = strings[i]
  console.log(item) // 'a', 'b', 'c', 'd'가 차례대로 출력됨
}