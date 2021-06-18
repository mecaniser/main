import React, { useState, useEffect, lazy, Suspense } from 'react';
import ToDoList from './components/ToDoList';
import ToDoContext from './context/ToDoContext';
import Loader from './components/loader'

const AddItem = lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./components/AddToDoItem'))
  }, 5000);
}))

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

        <Suspense fallback={<p>Loading...</p>}>
          <AddItem />
        </Suspense>

      </div>
    </ToDoContext.Provider>
  );
}

export default App;
