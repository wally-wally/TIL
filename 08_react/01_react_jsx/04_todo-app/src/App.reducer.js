import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가
      // action 내용
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // action 내용
      // { type: 'REMOVE', id: 1 }
      return todos.filter(todo => todo.id !== action.id)
    case 'TOGGLE': // 토글
      // action 내용
      // { type: 'TOGGLE', id: 1 }
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo);
    default:
      return todos;
  }
}

const App = () => {
  // useReducer를 사용할 때 두 번째 인자로 초기 상태를 넣어 줘야 하지만
  // undefined를 넣고 세 번째 인수로 초기 상태를 만들어주는 함수를 넣으면
  // 컴포넌트가 맨 처음 rendering 될 때만 createBulkTodos 함수가 호출된다.
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;