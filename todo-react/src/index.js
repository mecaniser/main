import React from "react";
import RD from "react-dom";
import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";

const App = () => {
  const todoData = [
    { label: "Drink Coffee", important: false, id:1},
    { label: "Build app yourself", important: true, id:2 },
    { label: "Drink Coffee again", important: false, id:3 },
  ];
  return (
    <div>
      <span>{new Date().toString()}</span>
      <AppHeader />
      <SearchPanel />
      <TodoList todos={todoData} />
    </div>
  );
};

RD.render(<App />, document.getElementById("root"));
