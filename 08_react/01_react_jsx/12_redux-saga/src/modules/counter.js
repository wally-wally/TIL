import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeLatest, select, throttle } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined를 두 번째 파라미터로 넣어 준다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초 대기
  yield put(increase()); // 특정 액션을 dispatch
  const number = yield select(state => state.counter); // 사가 내부에서 현재 상태 조회(state는 스토어 상태를 의미)
  console.log(`현재 값은 ${number}입니다.`);
}

function* decreaseSaga() {
  yield delay(1000); // 1초 대기
  yield put(decrease()); // 특정 액션을 dispatch
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해준다.
  // yield takeEvery(INCREASE_ASYNC, increaseSaga);

  // takeEvery 대신에 throttle을 사용하면 사가가 n초에 단 한 번만 호출되도록 설정할 수 있다.
  // 아래 구문은 increaseSaga는 3초에 단 한 번만 호출된다는 의미
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);

  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고
  // 가장 마지막으로 실행된 작업만 수행
  // 그렇기 때문에 -1을 여러 번 클릭해도 한 번 클릭한 것 처럼 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
  },
  initialState
);

export default counter;