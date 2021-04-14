import React from "react";
import RD from "react-dom";
import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";
const App = () => {
  return (
    <div>
      <span>{new Date().toString()}</span>
      <AppHeader />
      <SearchPanel />
      <TodoList />
    </div>
  );
};

RD.render(<App />, document.getElementById("root"));
