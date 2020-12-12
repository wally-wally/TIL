/**
 * 복잡한 택배 시스템
 * 1000개의 택배가 1초에 한 번씩 배송 된다.
 * 택배를 받으면 그 즉시 아래의 작업을 실행한다.
 * 
 * 1. 상품 개봉 (3초 소요)
 * 2. 상품 검사 (3초 소요)
 * 3. 상품 사용 (3초 소요)
 * 
 * 이때 택배 회사에는 종업원이 3명 밖에 없기 때문에 위 작업은 최대 3명에 의해서 동시에 실행될 수 있다.
 * 즉, 동시에 4개 이상의 작업을 실행될 수 없다.
 * 
 * 각 택배들에 대해서 상품 사용까지 종료된 택배들을 10개씩 묶어서 공항으로 보낸다.
 */

const { from, of, interval } = require('rxjs');
const { delay, tap, take, map, concatAll, mergeAll, reduce, bufferCount } = require('rxjs/operators');

function openBox(delivery) {
  return of(delivery).pipe(
    delay(3000),
    tap(delivery => console.log(`${delivery} 를 받았습니다.`))
  );
}

function checkProduct(delivery) {
  return of(delivery).pipe(
    delay(3000),
    tap(delivery => console.log(`${delivery} 를 검사했습니다.`))
  );
}

function useProduct(delivery) {
  return of(delivery).pipe(
    delay(3000),
    tap(delivery => console.log(`${delivery} 를 사용했습니다.`))
  ); 
}

function doTask(delivery) {
  // 이 작업들을 하나의 Observable로 만들어주고
  const tasks = from([openBox(delivery), checkProduct(delivery), useProduct(delivery)]);

  // 여러 개의 작업들을 하나하나 순차적으로(직렬로) 실행해주기 위해 concatAll 사용
  return tasks.pipe(
    concatAll(),
    // 각 행위(각 단계)가 끝날 때마다 바로바로 데이터를 방출하지 않고
    // 데이터를 켜켜히 쌓아서 전체 task가 끝나고 마지막에 데이터를 한 번만 방출하기 위해 reduce operator를 사용한다.
    reduce((acc, data) => {
      return delivery;
    })
  );
}

const deliveries = interval(1000).pipe(take(1000)); // 택배들의 데이터 스트림

function sendToAirport(tenDeliveries) {
  console.log('----------------------------------------');
  console.log('지금까지 모인 10개의 데이터');
  console.log(tenDeliveries);
  console.log('----------------------------------------');
}

deliveries.pipe(
  map(delivery => doTask(delivery)),
  // 각각의 task를 동시에 3개를 실행(3개씩 병렬로 처리)
  mergeAll(3),
  // bufferCount operator: 앞 단계에서 방출된 task가 x 개가 쌓이면 하나로 묶어서 다음 pipe로 보냄
  // 처리된 택배를 10개씩 모으는 작업 수행
  // '9를 사용했습니다.' 출력 후 10개의 데이터가 보임
  bufferCount(10),
  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], ...가 차례대로 tenDeliveries가 됨
  tap(tenDeliveries => sendToAirport(tenDeliveries))
).subscribe();