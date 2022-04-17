const { combineReducers } = require('redux');
const userReducer = require('./user');
const postReducer = require('./post');

// combineReducers의 key 값이 state 값의 key에 해당한다.
// reducer를 쪼개면 각 reducer에서 처리하는 범위가 좁아진다.
module.exports = combineReducers({
  user: userReducer,
  posts: postReducer,
});