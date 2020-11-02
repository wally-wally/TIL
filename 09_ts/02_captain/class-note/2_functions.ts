// 함수의 파라미터에 타입을 정의하는 방식
// function sum(a: number, b: number) {
//   return a + b;
// }
// sum(10, 20);

// 함수의 반환 값에 타입을 정의하는 방식
function add(): number {
  return 10;
}

// 함수에 타입을 정의하는 방식
function sum(a: number, b: number): number {
  return a + b;
}
sum(10, 20); // 30
// sum(10, 20, 30, 40); // sum 함수는 인자가 2개 필요한데 4개를 입력했기 때문에 오류가 발생한다.
// sum(10); // 필요한 인자의 개수가 적어도 오류가 발생한다.

// 함수의 옵셔널 파라미터
// 특정 인자를 선택적으로 사용하고 싶을 때 물음표(?)를 사용하면 된다.
function log(a: string, b?: string) {
  console.log(a);
  console.log(b);
}
log('hello wally')
log('hello ts', 'abc');