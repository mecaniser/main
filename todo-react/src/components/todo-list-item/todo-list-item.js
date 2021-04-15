import React, { Component } from "react";

import "./todo-list-item.css";

export default class TodoListItem extends Component {

  render() {
    const { label, onDelete, markedDone, markedImportant, important, done } = this.props;

    let classNames = "todo-list-item";

    if (done) {
      classNames += " done";
    }

    if (important) classNames += " important";

    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={markedDone}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={markedImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDelete}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
