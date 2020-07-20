import React, { useState, useRef, useCallback } from 'react';
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

const App = () => {
  // createBulkTodos() 라고 작성하면 re-rendering 될 때마다 createBulkTodos 함수가 호출되지만
  // 아래와 같이 useState의 인수를 함수 형태로 넣어 주면 컴포넌트가 처음 rendering 될 때만 createBulkTodos 함수가 실행됨
  const [todos, setTodos] = useState(createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // useState이 함수형 업데이트
    // setTodos에 파라미터를 새로운 상태를 넣는 것이 아닌 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수 있음
    setTodos(todos => todos.concat(todo));
    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const onToggle = useCallback(id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id 
        ? { ...todo, checked: !todo.checked}
        : todo
      )
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;