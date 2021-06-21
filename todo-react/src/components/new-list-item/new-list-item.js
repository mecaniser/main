import React, { Component } from "react";
import "./new-list-item.css";

export default class NewListItemForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState(() => {
      return { label: e.target.value };
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onNewItem(this.state.label);
    this.setState(() => {
      return { label: "" };
    });
  };

  render() {
    const { label } = this.state;

    return (
      <form className="new-list-item d-flex" onSubmit={this.onSubmit}>
        <input
          onChange={this.onLabelChange}
          className="form-control"
          type="text"
          value={label}
          placeholder="Do this next..."
        ></input>
        <button
          type="submit"
          className="btn btn-outline-primary btn-sm float-right"
        >
          <i className="fa fa-plus" />
        </button>
      </form>
    );
  }
}
