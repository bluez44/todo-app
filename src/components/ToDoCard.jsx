import React, { useState } from 'react'

import { MdDelete, MdEditSquare  } from "react-icons/md";
import { PiCheckThin } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";

function ToDoCard({ index, todo, setTodoList }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(todo);

  return (
    <div className={`pt-10 px-4 pb-4 bg-slate-700 rounded-2xl relative flex flex-col ${todo.task_status == 'Done' && 'opacity-60'}`}>
        <PiCheckThin 
            className={`absolute right-3 top-3 text-3xl transition-all hover:text-green-700 duration-300 cursor-pointer ${todo.task_status == 'Done' && 'text-green-700'}`}
            onClick={e => {
                const todoList = JSON.parse(window.localStorage.getItem('todo_list'))

                const todo = todoList[index]

                todo.task_status = "Done";
                
                setNewTodo(todo)

                todoList[index] = todo;

                window.localStorage.setItem('todo_list', JSON.stringify(todoList))

                setTodoList(JSON.parse(window.localStorage.getItem('todo_list')))
            }}
        />
        <input 
            type='text'
            className='text-4xl mb-5' 
            value={newTodo?.task_name}
            disabled={!isEdit}
            onChange={e => setNewTodo({...newTodo, task_name: e.target.value})}
        />
        <p className='text-start text-neutral-400'>
            Start time: 
            <input 
                type="datetime-local" 
                value={newTodo?.start_time} 
                disabled={!isEdit}
                onChange={e => setNewTodo({...newTodo, start_time: e.target.value})}
            />
        </p>
        <p className='text-start text-neutral-400'>
            End time: 
            <input 
                type="datetime-local" 
                value={newTodo?.end_time} 
                disabled={!isEdit}
                onChange={e => setNewTodo({...newTodo, end_time: e.target.value})}
            />
        </p>
        <p className='text-start'>
            Task location: 
            <input 
                type="text" 
                value={newTodo?.task_location} 
                disabled={!isEdit}
                onChange={e => setNewTodo({...newTodo, task_location: e.target.value})}
            />
        </p>
        <p>Task description</p>
        <textarea 
            className='text-white resize-none p-2 mb-2'
            value={newTodo?.task_description} 
            rows={3}
            disabled={!isEdit}
            onChange={e => setNewTodo({...newTodo, task_description: e.target.value})}
        />
        <div className='flex items-center gap-2'>
            <p>Task status:</p>
            <select 
                value={newTodo?.task_status} 
                className='flex-1 text-white bg-slate-500 rounded-2xl p-2'
                disabled={!isEdit}
                onChange={e => {
                    setNewTodo({...newTodo, task_status: e.target.value})
                    
                    const todoList = JSON.parse(window.localStorage.getItem('todo_list'))

                    const todo = todoList[index]

                    todo.task_status = e.target.value;

                    window.localStorage.setItem('todo_list', JSON.stringify(todoList))

                    setTodoList(JSON.parse(window.localStorage.getItem('todo_list')))
                }}
            >
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
            </select>
        </div>
        <div className='flex gap-2 justify-end mt-auto pt-2'>
            {isEdit? (
                <IoIosCheckmarkCircle 
                    className='text-3xl transition-all hover:text-green-600 duration-300 cursor-pointer'
                    onClick={e => {
                        const todoList = JSON.parse(window.localStorage.getItem('todo_list'))

                        todoList[index] = newTodo;

                        window.localStorage.setItem('todo_list', JSON.stringify(todoList))

                        setIsEdit(!isEdit)
                    }}
                />
            ) : (
                <MdEditSquare 
                    className='text-3xl transition-all hover:text-yellow-400 duration-300 cursor-pointer'
                    onClick={e => setIsEdit(!isEdit)}
                />
            )}
            
            <MdDelete 
                className='text-3xl transition-all hover:text-rose-700 duration-300 cursor-pointer'
                onClick={e => {

                    const todoList = JSON.parse(window.localStorage.getItem('todo_list'))

                    todoList.splice(index, 1)

                    window.localStorage.setItem('todo_list', JSON.stringify(todoList))

                    setTodoList(JSON.parse(window.localStorage.getItem('todo_list')))
                }}
            />
        </div>
    </div>
    )
}

export default ToDoCard