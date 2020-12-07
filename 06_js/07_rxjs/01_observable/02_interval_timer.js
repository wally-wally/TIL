const Rx = require('rxjs');
const { take } = require('rxjs/operators');

// 시간에 따른 데이터 스트림을 만드는 interval을 이용해서 Observable 만들기

// 1. interval 함수
// 시간 간격을 가지고 데이터의 흐름이 진행됨
const stream = Rx.interval(1000); // 1000[ms]에 한 번씩 어떤 데이터가 발생한다는 의미

// pipe: 흘러오는 데이터가 다른 쪽으로 흘러들어서 여러 종류의 작업을 할 수 있도록 해주는 것
// operator: 만들어준 pipe 안에 어떤 작업을 처리할 것인지 정의한 것
// take operator: 몇 개까지 데이터를 받을지 정의
stream.pipe(
  take(10)
).subscribe({
  next: (data) => {
    console.log(data); // 이 때 데이터는 0 부터 시작하는 숫자들의 배열이다.
  }
});


// 2. timer 함수
// 데이터의 흐름이 바로 시작하는 것이 아니라 몇 초 뒤에 데이터의 흐름이 시작됨
const stream2 = Rx.timer(3000, 1000); // 3초 뒤에 1초 간격으로 데이터의 흐름이 시작됨

stream2.pipe(
  take(10)
).subscribe({
  next: console.log
});