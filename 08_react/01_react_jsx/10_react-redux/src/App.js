import React from 'react';
import CounterContainer from './containers/CounterContainerHooks';
import TodosContainer from './containers/TodosContainerHooks';

const App = () => {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
};

export default App;