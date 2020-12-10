const Rx = require('rxjs');
const { take, tap, map, mergeMap, mergeAll } = require('rxjs/operators');

const stream = Rx.interval(1000).pipe(take(3), map(data => `택배${data + 1}`));

function openBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, '번째 상품 개봉');
      resolve(data);
    }, 1000);
  })
}

function checkBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, '번째 상품 검사');
      resolve(data);
    }, 1000);
  })
}

function useProduct(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, '번째 상품 사용');
      resolve(data);
    }, 1000);
  })
}

// Promise를 반환
async function userTask(data) {
  await openBox(data);
  await checkBox(data);
  await useProduct(data);
}

// (1) mergeMap
// concatMap은 일단 작업을 받으면 뒤에 대기시켜놓고 앞의 작업이 끝나면 이어서 수행하는 반면
// mergeMap은 데이터 스트림에 방해를 하지 않으면서 데이터가 올 때마다 비동기 작업을 동시에(즉시) 실행시키는 operator
stream.pipe(
  mergeMap(data => Rx.from(userTask(data)))
).subscribe();


// (2) mergeAll: 여러 개의 Observable을 동시에 실행
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream3 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream4 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream5 = Rx.interval(1000).pipe(take(3), tap(console.log));

const stream6 = Rx.of(stream1, stream2, stream3, stream4, stream5);

// mergeAll의 인자로 해당 숫자만큼 몇 개 작업을 동시에 실행할지 결정할 수 있다.
stream6.pipe(
  mergeAll(2)
).subscribe();