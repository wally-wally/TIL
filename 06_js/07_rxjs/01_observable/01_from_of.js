const Rx = require('rxjs');
// console.log(Rx);

// 정해진 데이터로부터 Observable 만들기

// 1. Array로부터 Observable 만들기 (from)
const deliveries = ['delivery1', 'delivery2', 'delivery3'];

const stream = Rx.from(deliveries); // 여러 개의 데이터의 흐름에 대한 Observable

// Observable 구독
stream.subscribe({
  // 다음 데이터가 왔을 때 어떤 행동을 취해라
  next: (data) => {
    console.log(data);
  },

  // 데이터가 모두 왔을 때 어떤 행동을 취해라
  complete: () => {
    console.log('completed');
  },

  // 데이터 받아 오는 과정에서 에러가 발생했을 때는 어떤 행동을 취해라.
  error: (err) => {}
});


// 2. Promise로부터 Observable 만들기 (from)
function makePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('delivery');
    }, 3000);
  })
}

Rx.from(makePromise()).subscribe({
  next: (data) => {
    console.log(data);
  }
});


// 3. 싱글 여러 데이터로부터 Observable 만들기 (of)
Rx.of('first', 'second', 'third').subscribe({
  next: (data) => {
    console.log(data);
  }
});