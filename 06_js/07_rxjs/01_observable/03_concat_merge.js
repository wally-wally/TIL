const Rx = require('rxjs');
const { take } = require('rxjs/operators');

// 두 개 이상의 Observable 합치기

const stream1 = Rx.from([1, 2, 3, 4, 5]);
const stream2 = Rx.from([6, 7, 8, 9, 10]);

const stream3 = Rx.interval(1000).pipe(take(3)); // 0-------1-------2
const stream4 = Rx.interval(1000).pipe(take(3)); // 0-------1-------2

// 1. concat: 차례대로 이어 붙임
// 0-------1-------2-------0-------1-------2 와 같이 직렬로 처리함
Rx.concat(stream1, stream2).subscribe({
  next: console.log
});

// 1초에 한 번 씩 0, 1, 2, 0, 1, 2이 차례대로 출력됨
Rx.concat(stream3, stream4).subscribe(console.log);


// 2. merge: 병합
// 0-------1-------2
// 0-------1-------2
// 위와 같이 병렬로 처리함

// 0, 0이 동시에 나온 후 1초 뒤 1, 1이 동시에 나오고 1초 뒤에 2, 2가 동시에 출력됨
Rx.merge(stream3, stream4).subscribe(console.log);