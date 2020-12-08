const Rx = require('rxjs');
const { tap, filter, map, reduce } = require('rxjs/operators');

const stream = Rx.from([1, 2, 3, 4]);

// (1) tap: 데이터 자체는 아무런 영향을 끼치지 않고(데이터의 흐름에 방해 X) 오는 데이터를 가지고 원하는 작업을 수행한다.
// tap은 여려 번 사용할 수 있다.
stream.pipe(
  tap(data => {
    console.log(`한번 읽음: ${data}`);
  }),
  tap(data => {
    console.log(`또 한번 읽음: ${data}`);
  }),
).subscribe({
  next: () => {}
})

console.log('---------');

// (2) filter: 필터링
stream.pipe(
  filter(data => data > 1), // data가 1보다 클 때만 통과
  filter(data => data > 3) // data가 3보다 클 때만 통과
).subscribe(console.log);

console.log('---------');

// (3) map: 들어온 데이터를 어떻게 변형할지 결정
// 아래 코드는 한 pipe를 거칠 때 마다 2를 곱하게 된다.
stream.pipe(
  map(data => data * 2),
  map(data => data * 2)
).subscribe(console.log);

console.log('---------');

// (4) reduce: 현재 데이터와 앞에서 전달된 데이터를 가지고 작업을 수행
stream.pipe(
  reduce((acc, data) => {
    return acc + data
  })
).subscribe(console.log);