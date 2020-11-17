hello(); // 안녕하세요
function hello() {
  console.log("안녕하세요");
}

hello2(); // Uncaught TypeError: hello is not a functio
var hello2 = function () {
  console.log("안녕하세요");
}