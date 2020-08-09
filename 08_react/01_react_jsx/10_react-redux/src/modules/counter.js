import { createAction, handleActions } from 'redux-actions';

const INCREASE = 'counter/increase';
const DECREASE = 'counter/decrease';

// export const 변수 = () => (action 객체);
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

// createAction 함수 적용: 매번 객체를 직접 만들 필요가 없다.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0
};

// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1
//       };
//     default: 
//       return state;
//   }
// }

// handleActions 함수 적용: 리듀서 함수를 더 간단하고 가독성 높게 작성
// 첫 번째 인자: 각 액션에 대한 업데이트 함수, 두 번째 인자: 초기 상태
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
)

export default counter;