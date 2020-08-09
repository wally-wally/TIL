import React, { useCallback } from 'react';
import Todos from '../components/Todos';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import { useSelector, useDispatch } from 'react-redux';
// import useActions from '../lib/useActions';

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }));

  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
  // const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
  //   [changeInput, insert, toggle, remove],
  //   []
  // );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

// connect 함수를 사용하여 컨테이너 컴포넌트를 만들면 자동으로 성능 최적화가 되지만
// useSelector를 사용하여 리덕스 상태를 조회했을 때는 최적화 작업이 자동으로 이루어지지 않으므로
// 성능 최적화를 위해 React.memo를 컨테이너 컴포넌트에 사용해 주어야 한다.
// 물론 지금과 같은 경우는 TodosContainerHooks의 부모 컴포넌트인 App 컴포넌트가 re-rendering되는 일이 없으므로
// 해당 작업은 불필요한 성능 최적화이다.
// export default React.memo(TodosContainer);
export default TodosContainer;