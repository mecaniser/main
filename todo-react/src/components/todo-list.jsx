import React from 'react';
import ToDoListItem from './todo-list-item';
const TodoList = () => {
    const items = ["Learn React Like a Pro", "Build your own applications"];
    return (
      <ul>
          
        <li><ToDoListItem  /></li>
        <li><ToDoListItem  /></li>
      </ul>
    );
  };

  export default TodoList;