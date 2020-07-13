import React from 'react';
import Header from './components/common/Header/Header'
import TodoList from './components/contents/TodoList/TodoList'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <hr/>
      <TodoList/>
    </div>
  );
}

export default App;
