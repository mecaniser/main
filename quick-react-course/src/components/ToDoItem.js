import React from "react";
import PropTypes from "prop-types";

import "./ToDoItem.css";

const ToDoItem = ({ todo, index }) => {
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
      <span>
        <input style={styles.input} type="checkbox" />
        <b style={styles.b}>{index + 1}</b>
        {todo.title}
      </span>
      <button className='rmBtn'> &times; </button>
    </li>
  );
};

ToDoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
export default ToDoItem;
