import './App.css'

import ToDoForm from './components/ToDoForm'
import ToDoCard from './components/ToDoCard';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState(JSON.parse(window.localStorage.getItem('todo_list')) || [])

  return (
    <div className=''>
      <h1 className='my-5'>
        SIMPLE TO DO APP
      </h1>
      <div className='flex flex-col md:flex-row gap-4'>
        <ToDoForm setTodoList={setTodoList}/>
        <div className='flex-4 flex flex-wrap flex-col md:flex-row gap-4'>
          {todoList.map((todo, index) => (
            <ToDoCard key={index} index={index} setTodoList={setTodoList} todo={todo}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
