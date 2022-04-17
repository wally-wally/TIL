const { createStore } = require('redux');
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

const store = createStore(reducer, initialState);
store.subscribe(() => {
  console.log('changed');
});

console.log('1st', store.getState());

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