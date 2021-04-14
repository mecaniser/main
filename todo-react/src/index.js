import React from "react";
import RD from "react-dom";

const TodoList = () => {
  const items = ["Learn React Like a Pro", "Build your own applications"]
  return (
    <ul>
      <li>{items[0]}</li>
      <li>{items[1]}</li>
    </ul>
  );
};

const AppHeader = () => <h1>My TODO list </h1>;
const SearchPanel = () => <input placeholder="search" />;
const App = () => {
  return (
    <div>
      <AppHeader />
      <SearchPanel />
      <TodoList />
    </div>
  );
};

RD.render(<App />, document.getElementById("root"));
