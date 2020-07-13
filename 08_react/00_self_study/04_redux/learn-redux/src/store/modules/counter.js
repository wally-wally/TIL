// (1-1) 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';


// (1-2) 액션 생성함수 정의
// 액션 생성함수 앞에 export를 꼭 붙여야 나중에 컴포넌트에서 redux를 연동하고 불러와서 사용한다.
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// (1-3) 초기상태 정의
const initialState = {
  color: 'red',
  number: 0,
};

// (1-4) 리듀서 작성
// 리듀서 : 변화에 관련된 작업을 하는 함수이다.
// 리듀서는 스토어의 상태와 액션 객체를 인자로 받아 변화를 일으키며, 함수의 리턴값은 새로운 상태 이다.
// 리듀서 함수는 앞에 반드시 export default를 작성해야 한다.
// 나중에 스토어를 만들 때 이 함수를 필요로 한다.

// reducer 함수는 다음의 세 가지 조건을 만족하는 '순수한 함수' 여야 합니다.
// i) reducer 함수 내에서 비동기 작업을 수행하면 안 된다.
// ii) reducer 함수로 들어온 인수를 변경해서는 안 된다.
// iii) reducer 함수로 들어온 인수가 같다면 결과는 항상 동일해야한다.
export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}