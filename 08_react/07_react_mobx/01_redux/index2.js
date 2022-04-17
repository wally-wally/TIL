const { createStore } = require('redux');

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...prevState,
        user: action.data,
      };
    case 'LOG_OUT':
      return {
        ...prevState,
        user: null,
      };
    case 'ADD_POST':
      return {
        ...prevState,
        posts: [...prevState.posts, action.data],
      };
    default:
      return prevState;
  }
};

const initialState = {
  user: null,
  posts: [],
};

// reducer의 불변성 패턴을 작성하기 어려우면 state의 변화를 직접 쓰면서 파악해보자.
// const nextState = {
//   ...initialState,
//   posts: [{ id: 1 }],
// };

// const nextState = {
//   ...initialState,
//   posts: [{ id: 1 }, { id: 2 }].
// };

const store = createStore(reducer, initialState);
store.subscribe(() => {
  console.log('changed');
});

console.log('1st', store.getState());

const logIn = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
};
const logOut = () => {
  return {
    type: 'LOG_OUT',
  }
};

const addPost = (data) => {
  return {
    type: 'ADD_POST',
    data,
  }
};

// reducer, state, store, action까지는 미리 만들어놓자.
// -----------------------------
// dispatch하는 부분은 나중에 만들자.(react에서 실행되는 것들이다.)

store.dispatch(logIn({
  id: 1,
  name: 'wally',
  admin: true,
}));

console.log('2nd', store.getState());

store.dispatch(addPost({
  userId: 1,
  id: 1,
  content: 'hello redux!',
}));

console.log('3rd', store.getState());

store.dispatch(addPost({
  userId: 1,
  id: 2,
  content: 'bye redux!',
}));

console.log('4th', store.getState());

store.dispatch(logOut());

console.log('5th', store.getState());