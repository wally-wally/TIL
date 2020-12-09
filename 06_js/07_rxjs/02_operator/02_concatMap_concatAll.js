const Rx = require('rxjs');
const { take, concatMap, concatAll, tap } = require('rxjs/operators');

const stream = Rx.from([1, 2, 3, 4]);

// (1) concatMap: 각 데이터마다 다른 Observable로 mapping 시켜줌
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

// concatMap 안에 함수가 들아가되 input은 data를 받고 output은 Observable 형태이어야 한다.
stream.pipe(
  concatMap((data) => Rx.from(userTask(data)))
).subscribe();


// (2) concatAll: 데이터의 흐름 자체가 또 다른 Observable의 흐름일 때 concatAll이 사용됨
// 여러 개의 Observable에 대한 Observable들 안에서 여러 개의 데이터 스트림이 종료된 후 이어 붙이고 싶을 때 사용됨
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log));

const stream3 = Rx.of(stream1, stream2); // stream1와 stream2 즉, 두 개의 Observable에 대한 Observable(stream3)을 만듬

// stream1이 종료된 뒤에 stream2가 실행됨
stream3.pipe(
  concatAll()
).subscribe();