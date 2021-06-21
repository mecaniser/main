import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import NewListItemForm from "../new-list-item";

export default class App extends Component {
  maxId = 10;

  state = {
    todoData: [
      this.creatToDoItem("Drink Coffee"),
      this.creatToDoItem("Make Awesome App"),
      this.creatToDoItem("Have a lunch"),
    ],
    term: "",
    listFilter: "all",
  };

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
  onSearchChange = (term) => {
    this.setState({ term });
  };
  onFilterChange = (listFilter) => {
    this.setState({ listFilter });
  };
  
  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      console.log(item.label);
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }
  listFilter(items, filter) {
    switch (filter) {
      case "all":return items
      case "active": return items.filter((item) => !item.done)
      case "done": return items.filter((item)=> item.done)
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, listFilter } = this.state;
    const visibleItems = this.listFilter(this.search(todoData, term),listFilter);
    const doneCnt = todoData.filter((el) => el.done).length;
    const toBeDoneCnt = todoData.filter((el) => !el.done).length;
    return (
      <div className="todo-app">
        <AppHeader toDo={toBeDoneCnt} done={doneCnt} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={listFilter} onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList
          markedDone={this.markedDone}
          markedImportant={this.markedImportant}
          onItemDelete={(id) => {
            this.deleteItem(id);
          }}
          todos={visibleItems}
        />
        <NewListItemForm onNewItem={this.addItem} />
      </div>
    );
  }
}
