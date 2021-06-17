import React from 'react';
import ToDoList from './components/ToDoList';
function App() {
  const todos  = [
    {id:1 , completed: false, title: "Move to the right"},
    {id:2 , completed: false, title: "Move to the left"},
    {id:3 , completed: true, title: "Move forward"},
  ]

  return (
    <div className="wrapper">
      <h1>White Page</h1>
      <ToDoList todos={todos} />
    </div>
  );
}

export default App;
