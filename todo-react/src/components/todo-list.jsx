import React from "react";
import ToDoListItem from "./todo-list-item";

const TodoList = ({ todos }) => {
  const listEl = todos.map((item) => {
    const {id, ...itemProps} = item
    return (
      <li key={item.id}>
        <ToDoListItem  {...itemProps} />
      </li>
    );
  });

  return (<>{ listEl }</>)
};

export default TodoList;
