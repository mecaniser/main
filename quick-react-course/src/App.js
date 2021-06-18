import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import ToDoContext from './context/ToDoContext';
import AddItem from './components/AddToDoItem';

function App() {

  const [todos, setTodos] = useState([
    { id: 1, completed: false, title: "Move to the right" },
    { id: 2, completed: false, title: "Move to the left" },
    { id: 3, completed: false, title: "Move forward" },
  ]);

  const itemChecked = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) { todo.completed = !todo.completed }
        return todo
      })
    )
  }
  const removeItem = id => setTodos(todos.filter(todo => todo.id !== id))
  const onCreate = title => {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]));

  }

  return (
    <ToDoContext.Provider value={{ removeItem, onCreate }}>
      <div className="wrapper">
        <h1>To Do List Page</h1>
        {todos.length > 0 ? <ToDoList todos={todos} onInputCheck={itemChecked} /> : <h4>Your <i>To do</i> list is empty!</h4>
        }
        <AddItem />
      </div>
    </ToDoContext.Provider>
  );
}

export default App;
