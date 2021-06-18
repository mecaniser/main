import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import ToDoContext from './context/ToDoContext';
import AddItem from './components/AddToDoItem';
import Loader from './components/loader'

function App() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=6')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos, console.log(todos))
          setLoading(false)
        }, 3000)
      })
  }, []);

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
        {todos.length > 0
          ? <ToDoList todos={todos} onInputCheck={itemChecked} />
          : loading
            ? <Loader />
            : <h4>Your <i>To do</i> list is empty!</h4>
        }
        <AddItem />

      </div>
    </ToDoContext.Provider>
  );
}

export default App;
