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
      this.creatToDoItem("Have a lunch"),
    ],
  };
  // getItemIdx({todoData}) {
  //   return todoData.findIndex((el) => el.id === id);
  // }
  toggleProp(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  creatToDoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }
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
    const newItem = this.creatToDoItem(text);
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData,
      };
    });
  };

  markedDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, "done"),
      };
    });
  };

  markedImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, "important"),
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCnt = todoData.filter((el) => el.done).length;
    const toBeDoneCnt = todoData.filter((el) => !el.done).length;
    console.log(doneCnt);
    return (
      <div className="todo-app">
        <AppHeader toDo={toBeDoneCnt} done={doneCnt} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          markedDone={this.markedDone}
          markedImportant={this.markedImportant}
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
