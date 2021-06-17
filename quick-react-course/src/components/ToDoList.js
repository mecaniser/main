import React from "react";
import ToDoItem from "./ToDoItem";

import PropTypes from 'prop-types';

const ToDoList = (props) => {
  const style = {
    ul: {
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
  };

  return (
    <ul style={style.ul}>
      {props.todos.map((todo, idx) => {
        return <ToDoItem key={todo.id} todo={todo} index={idx}/>;
      })}
    </ul>
  );
};

ToDoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default ToDoList;
