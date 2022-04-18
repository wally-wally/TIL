const { createStore, applyMiddleware } = require('redux');
const reducer = require('./reducers');
const { addPost } = require('./actions/post');
const { logIn, logOut } = require('./actions/user');

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

// compose(): 합성하는 함수로 함수를 추가로 붙일 때 사용한다.(combineReducer와 비슷할수도)
// ex) compose(applyMiddleware(), devtool());
// 만약 applyMiddleware 이거 하나만 쓰면 compose는 안 써도 된다.

// 기본적으로 middleware는 삼단 중첩 함수로 구성되어 있다.
// 삼단 중첩 함수인 이유는 그냥 약속이다...(함수형 프로그래밍의 영향을 받음 - 커링 방식)
// 첫 번째 인자의 store가 redux의 store다.
const firstMiddleware = (store) => (next) => (action) => {
  // 이 함수 안에 next 앞 뒤로 기능을 추가하면 된다.
  console.log('액션 로깅', action);
  // 아래 라인이 기본 기능
  next(action);
};

const thunkMiddleware = (store) => (next) => (action) => {
  // action을 함수로 두는 경우 => '비동기'라고 redux와 나와 약속을 짓는 것이다.
  if (typeof action === 'function') {
    // action에 들어가는 인자 순서는 바뀌어도 무방함
    return action(store.dispatch, store.getState);
  }

  return next(action);
}

const enhancer = applyMiddleware(
  firstMiddleware,
  thunkMiddleware,
);

const store = createStore(reducer, initialState, enhancer);
console.log('1st', store.getState());

// logIn은 이제 비동기 action creator
store.dispatch(logIn({
  id: 1,
  name: 'wally',
  admin: true,
}));

console.log('2nd', store.getState());

// store.dispatch(addPost({
//   userId: 1,
//   id: 1,
//   content: 'hello redux!',
// }));

// console.log('3rd', store.getState());

// store.dispatch(addPost({
//   userId: 1,
//   id: 2,
//   content: 'bye redux!',
// }));

// console.log('4th', store.getState());

// store.dispatch(logOut());

// console.log('5th', store.getState());