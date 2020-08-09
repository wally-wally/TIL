import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// export const changeInput = input => ({
//   type: CHANGE_INPUT,
//   input
// });

// createAction 함수의 두 번째 인자는 액션 생성 함수에서 받아 온 파라미터를 변형을 주고 싶을 때 사용된다.
export const changeInput = createAction(CHANGE_INPUT, input => input);

let id = 3; // insert가 호출될 때마다 1씩 더해진다.
// export const insert = text => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false
//   }
// });
export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false,
}))

// export const toggle = id => ({
//   type: TOGGLE,
//   id
// });
export const toggle = createAction(TOGGLE, id => id);

// export const remove = id => ({
//   type: REMOVE,
//   id
// });
export const remove = createAction(REMOVE, id => id);

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: 'redux basic',
      done: true
    },
    {
      id: 2,
      text: 'redux intermediate',
      done: false
    }
  ]
};

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo)
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo
//         )
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.id)
//       };
//     default:
//       return state;
//   }
// }

// handleActions 함수 적용한 리듀서
// createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 객체 안에 넣을 때 원하는 이름으로 넣는 것이 아니라
// action.id, action.todo와 같이 action.payload라는 이름을 공통적으로 넣어 주게 된다.
// 그러므로 기존의 업데이트 로직에서도 모두 action.payload 값을 조회하여 업데이트하도록 구현해 주어야 한다.
// 하지만 모든 추가 데이터 값을 action.payload로 사용하기 때문에 나중에 리듀서 코드를 볼 때 헷갈릴 수 있다.
// 그래서 object destructuring 문법으로 action 값의 payload 이름을 새로 설정해 주면 action.payload가 정확이 어떤 값을 의미하는지 더 쉽게 파악할 수 있다.
// const todos = handleActions(
//   {
//     [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
//     [INSERT]: (state, { payload: todo }) => ({
//       ...state,
//       todos: state.todos.concat(todo),
//     }),
//     [TOGGLE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.map(todo => 
//         todo.id === id ? { ...todo, done: !todo.done } : todo ),
//     }),
//     [REMOVE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.filter(todo => todo.id !== id),
//     })
//   },
//   initialState,
// )

// immer를 적용한 리듀서
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => 
      produce(state, draft => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, draft => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) => 
      produce(state, draft => {
        const todo = draft.todos.find(todo => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.todos.findIndex(todo => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
)

export default todos;