const { createStore } = require('redux');

// react에서 불변성을 지켜야하는 이유
// 1) history 기능, 2) 추적 가능
// initialState.compA = 'b'; 로 직접 바꾸면 이전 상태를 알 수가 없다.(컴퓨터 입장에서)

// reducer - action을 받아서 새로운 state를 만들어 주는 애(불변성 조심!)
// 새로운 state로 대체되는 것임
// 무조건 새로운 state를 만들어줘야하므로 return이 항상 있어야 한다.
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'CHANGE_COMP_A':
      return {
        ...prevState,
        compA: action.data,
      };
    case 'CHANGE_COMP_B':
      return {
        ...prevState,
        compB: action.data,
      };
    case 'CHANGE_COMP_C':
      return {
        ...prevState,
        compC: action.data,
      };
    // 에러 처리 대비(case에 걸리는 애가 없는 경우 - 대표적인 예시가 action.type의 오타...)
    default:
      return prevState;
  }
};

const initialState = {
  compA: 'a',
  compB: 12,
  compC: null,
};

const store = createStore(reducer, initialState);
// 이벤트 리스너 인데 보통 react-redux 안에 들어있다.
// 에러 디버깅할 때만 가끔쓴다.
store.subscribe(() => {
  console.log('changed'); // state 변경될 때 화면 바꿔주는 함수
});

console.log('1st', store.getState());

// action - 확장성 있게 만들자
// 함수 자체가 action은 아니고 return하는 객체가 action이다.
// 함수는 action을 동적으로 만들어내는 creator 역할(액션 생성자)을 한다.
// (액션 생성자는 굳이 없어도 되지만 없다면 중복이 어마어마하게 많아질 것이다...)
const changeCompA = (data) => {
  // return하는 게 action
  // 참고로 type, data은 고정 프로퍼티명이 아니다.
  return {
    type: 'CHANGE_COMP_A',
    data,
  }
};

// store.dispatch({
//   type: 'CHANGE_COMP_A',
//   data: 'b',
// });
store.dispatch(changeCompA('b'));

console.log('2nd', store.getState());