import React from 'react';
import './TodoItem.css';

interface Props {
  text: string;
  done: boolean;
  onToggle(): void;
  onRemove(): void;
}

const TodoItem: React.SFC<Props> = ({text, done, onToggle, onRemove}) => (
  <li>
    <b
      onClick={onToggle}
      style={{
        textDecoration: done ? 'line-through' : 'none',
        color: done ? 'gray' : 'black'
      }}
    >
      {text}
    </b>
    <br/>
    <button id="delete-btn" onClick={onRemove}>지우기</button>
  </li>
);

export default TodoItem;