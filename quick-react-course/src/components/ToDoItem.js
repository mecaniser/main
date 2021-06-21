import React, { useContext } from "react";
import PropTypes from "prop-types";
import ToDoContext from "../context/ToDoContext";

import "./ToDoItem.css";

const ToDoItem = ({ todo, index, onInputChange }) => {

  const { removeItem } = useContext(ToDoContext);

  const classes = []

  todo.completed && classes.push('done')

  const styles = {
    li: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: ".5rem 1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: ".5rem",
    },
    input: {
      marginRight: "1rem",
    },
    b: {
      marginRight: "5px",
    },
  };

  return (
    <li style={styles.li}>
      <span className={classes.join(" ")}>
        <input style={styles.input} type="checkbox" onChange={() => onInputChange(todo.id)} checked={todo.completed} value={todo.completed} />
        <b style={styles.b}>{index + 1}</b>
        {todo.title}
      </span>
      <button onClick={removeItem.bind(null, todo.id)} className='rmBtn'> &times; </button>
    </li>
  );
};

ToDoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
export default ToDoItem;
