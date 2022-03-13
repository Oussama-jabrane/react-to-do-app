import React, {useRef, useState, useEffect} from 'react';
import ToDoList from './ToDoList.js';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const [todos, setTodos] = useState([])
  const TodoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = TodoNameRef.current.value;
    if (name === '' ) return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    TodoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="root">
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={ TodoNameRef } type="text" />
      <button onClick={ handleAddTodo } className="task">Add Task</button>
      <button onClick={ handleClearTodos } className="clear">Clear Completed Todos</button>
      <div className="left">{todos.filter(todo => !todo.complete).length} left todo</div>
    </div>
  );
}

export default App;
