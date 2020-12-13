/**
 * 10초에 한 번씩 주식 거래를 시작한다.
 * 
 * 한 번의 주식 거래에서는 1000번의 API call을 수행한다.
 * 1000번의 API call을 함에 있어서 동시 요청을 10회 이하로 제한한다.
 * 10회의 요청이 끝날 때마다 5[ms] 동안 휴식을 한다.
 * 1000번의 요청 중에 에러가 발생하면 요청을 다시 시작하되 최대 2번까지 반복한다.
 * (물론 동시 요청 10회 이하의 조건은 만족해야 한다.)
 * 
 * 주식 거래를 성공한 뒤에는 10개씩 나누어 결과를 저장하되, 주식 거래 행위에 영향을 주지 않도록 비동기로 저장한다.
 */

const { default: Axios } = require('axios');
const { from, range, interval } = require('rxjs');
const { mergeAll, delay, retry, mergeMap, bufferCount } = require('rxjs/operators');

// 함수명 뒤에 붙인 $ 표시는 Observable 객체를 반환하는 함수라고 암시적으로 약속하자.

function startTrade$(tradeNumber) {
  // range(시작 번호, 몇 번 호출할지)
  return range(0, 1000).pipe(
    map(() => apiCall$().pipe(delay(5))),
    mergeAll(10),
    retry(2),
    reduce((acc, data) => {
      return tradeNumber
    })
  )
}

function apiCall$() {
  return from(Axios.get('https://www.naver.com'))
}

function saveResult$() {
  /**
   * ... fs.write
   * ... 데이터베이스 입출력
   */
}

interval(10 * 1000).pipe(
  mergeMap((tradeNumber) => startTrade$(tradeNumber)),
  bufferCount(10), // [0, 1, 2, ...]와 같이 거래 번호들이 저장된다.
  mergeMap(results => saveResult$(results))
)