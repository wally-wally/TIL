import React, { Component } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

interface Props {

}

interface TodoItemState {
  id: number;
  text: string;
  done: boolean;
}

interface State {
  input: string;
  todoItems: TodoItemState[];
}

class TodoList extends Component<Props, State> {
  nextTodoId: number = 0;

  state: State = {
    input: '',
    todoItems: []
  }

  onToggle = (id: number): void => {
    const { todoItems } = this.state;
    const nextTodoItems:TodoItemState[] = todoItems.map(item => {
      if (item.id === id) {
        item.done = !item.done
      }
      return item;
    });

    this.setState({
      todoItems: nextTodoItems
    });
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const { todoItems, input } = this.state;
    const newItem:TodoItemState = {
      id: this.nextTodoId++,
      text: input,
      done: false
    };
    const nextTodoItems:TodoItemState[] = todoItems.concat(newItem);
    this.setState({
      input: '',
      todoItems: nextTodoItems
    })
  }

  onRemove = (id: number): void => {
    const { todoItems } = this.state;
    const nextTodoItems: TodoItemState[] = todoItems.filter(item => item.id !== id);
    this.setState({
      todoItems: nextTodoItems
    })
  }

  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      input: value
    })
  }

  onShuffle = (): void => {
    const { todoItems } = this.state;
    const todoItemCnt = todoItems.length;
    let shuffleIdx: number[] = [];
    let shuffleTodoItems: TodoItemState[] = [];
    while (shuffleIdx.length < todoItemCnt) {
      let randomValue = Math.floor(Math.random() * todoItemCnt)
      if (!shuffleIdx.includes(randomValue)) {
        shuffleIdx.push(randomValue)
        shuffleTodoItems.push(todoItems[randomValue])
      }
    }
    this.setState({
      todoItems: shuffleTodoItems
    })
  }

  render() {
    const { onSubmit, onToggle, onRemove, onChange } = this;
    const { input, todoItems } = this.state;

    const todoItemList: React.ReactElement[] = todoItems.map(
      todo => (
        <TodoItem
          key={todo.id}
          done={todo.done}
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
          text={todo.text}
        />
      )
    );

    return (
      <div>
        <div className="input-wrapper">
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={input} />
            <button type="submit">Add</button>
          </form>
          <button id="shuffle-btn" onClick={this.onShuffle}>섞기</button>
        </div>
        <ul>
          {todoItemList}
        </ul>
      </div>
    );
  }
}

export default TodoList;