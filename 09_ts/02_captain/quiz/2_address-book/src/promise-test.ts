// function fetchItems(): string[] {
//   let items = ['a', 'b', 'c'];
//   return items;
// }
// let result = fetchItems();
// console.log(result);

// Promise가 기본적으로 제네릭을 이용해서 정의되고 있다.
// Promise는 제네릭으로 타입을 받도록 내부적으로 구성되어 있으며
// 위와 같은 코드는 동기적인 코드로 타입 추론이 가능하고
// 아래와 같은 비동기적인 코드는 타입 추론이 불가능하기 때문에
// Promise를 사용할 때 제네릭에 타입을 명시해줘야 한다.
function fetchItems(): Promise<string[]> {
  let items: string[] = ['a', 'b', 'c'];
  return new Promise(function(resolve) {
    resolve(items);
  })
}
fetchItems();