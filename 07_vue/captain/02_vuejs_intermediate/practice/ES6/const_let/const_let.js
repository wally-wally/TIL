function f() {
  {
    let x;
    {
      // 새로운 블록안에 새로운 x의 스코프가 생김
      const x = "sneaky";
      // 위에 이미 const로 x를 선언했으므로 다시 값을 대입하면 에러 발생
      x = "foo";
    }
    // 이전 블록 범위로 돌아왔기 때문에 `let x`에 해당하는 메모리에 값을 대입
    x = "bar";
    // error, already declared above in this block
    // Uncaught SyntaxError: Identifier 'x' has already been declared
    let x = "inner";
  }
}