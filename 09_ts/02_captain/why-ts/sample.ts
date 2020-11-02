function add(a: number, b: number): number {
  return a + b;
}

var result = add(10, 20);
// vscode intellisense
// https://code.visualstudio.com/docs/editor/intellisense
// 자동 완성을 통해서 해당 변수의 타입에서 사용할 수 있는 API를 볼 수 있다.
result.toLocaleString();
// add(10, '20');