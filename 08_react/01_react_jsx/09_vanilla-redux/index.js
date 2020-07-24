import { createStore } from 'redux';

// (1) DOM 객체 만들기
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#descrease');


// (2) 액션 타입 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';


// (3) 액션 생성 함수 정의
// 액션 이름을 사용해서 액션 객체를 만드는 액션 생성 함수를 만드는데
// 이 때 액션 객체는 type 값을 반드시 갖고 있어야 하며,
// 그 외에 추후 상태를 업데이트할 때 참고하고 싶은 값은 마음대로 넣으면 된다.
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });


// (4) 초깃값 설정
const initialState = {
  toggle: false,
  counter: 0
};


// (5) 리듀서 함수 정의
// 변화를 일으키는 함수인 리듀서를 정의한다.
// 함수의 인자로는 state와 action 값을 받아 온다.
// 리듀서 함수는 순수한 함수여야 한다.
// 즉, 랜덤 값을 만들거나, Date 함수를 사용해서 현재 시간을 가져오거나, 네트워크 요청을 한다면
// 파라미터가 같아도 다른 결과를 만들어낼 수 있기 때문에 사용하면 안 된다.
// 이러한 작업은 리듀서 함수 밖에서 처리해 주어야 한다.(액션 만드는 과정이나 리덕스 미들웨어에서 처리)

// state가 undefined일 때는 initialState 를 기본값으로 사용한다.
function reducer(state = initialState, action) {
  // action.type 에 따라 다른 작업을 처리함
  // spread 연산자(...)를 활용해서 불변성을 유지하는 것은 기본!
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}


// (6) 스토어 생성
const store = createStore(reducer);


// (7) render 함수 만들기
// 상태가 업데이트될 때마다 호출하여 이미 html을 사용하여 만들어진 UI 속성을 상태에 따라 변경해준다.
// react의 render 함수와는 다름!
const render = () => {
  const state = store.getState(); // 현재 상태를 불러옴
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();


// (8) 구독하기
// 현재 프로젝트에서는 subscribe 함수를 사용하지만 리액트 프로젝트에서는 react-redux 라이브러리에서 제공하는 함수나 컴포넌트로 작업을 처리할 예정
store.subscribe(render); // subscribe 함수를 사용해서 스토어의 상태가 바뀔 때마다 render 함수가 호출되도록 설정


// (9) 액션 발생시키기(dispatch)
// dispatch 함수도 subscribe와 마찬가지로 리액트 프로젝트에서는 react-redux 라이브러리에서 제공하는 함수나 컴포넌트로 작업을 처리할 예정
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};