import React, { Component } from "react";
import "./new-list-item.css";

export default class NewListItem extends Component {
  
  render() {
    const { onNewItem } = this.props;

    return (
      <div className="new-list-item">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm float-right"
          onClick={onNewItem}
        >
          <i className="fa fa-plus" />
        </button>
      </div>
    );
  }
}
