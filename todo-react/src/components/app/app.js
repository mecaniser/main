import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import NewListItem from "../new-list-item";

export default class App extends Component {
  maxId = 10;

  state = {
    todoData: [
      this.creatToDoItem("Drink Coffee"),
      this.creatToDoItem("Make Awesome App"),
      this.creatToDoItem("Have a lunch")
    ],
  };
  creatToDoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  };
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = {
        label: text,
        important: false,
        id: this.maxId++,
      };

      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData,
      };
    });
  };

  render() {
    const { todoData } = this.state;
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          onItemDelete={(id) => {
            this.deleteItem(id);
          }}
          todos={todoData}
        />
        <NewListItem onNewItem={() => this.addItem("Hello there!")} />
      </div>
    );
  }
}
