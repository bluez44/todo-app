import React, { useState } from 'react'
import { ValidateTask, ResetTaskForm } from '../utils/function/HandleSaveTask'


function ToDoForm({ setTodoList }) {
  const [todo, setTodo] = useState({
    task_name: '',
    task_description: '',
    task_location: '',
    end_time: '',
    start_time: '',
    task_status: 'Pending' 
  })
  const [taskError, setTaskError] = useState({
    error: {},
    message: 'Please fill in all required fields'
  })

  return (
    <form action="" className='text-white bg-slate-800 rounded-2xl py-5 px-8 text-start flex-1'>
        <div className='relative mb-5'>
            <p>Task name</p>
            <input 
                className='p-4 bg-slate-500 rounded-2xl w-full' 
                type="text" 
                name='task_name' 
                placeholder='Enter your task'
                value={todo.task_name || ''}
                onChange={e => {
                    setTodo({
                        ...todo,
                        task_name: e.target.value
                    })

                    if(!e.target.value) 
                        setTaskError({
                            ...taskError,
                            error: {
                                ...taskError.error,
                                task_name: '* Please fill in task name *'
                            }
                        })
                    else 
                        setTaskError({
                            ...taskError,
                            error: {
                                ...taskError.error,
                                task_name: ''
                            }
                        })  
                }}
            />
            {taskError.error.task_name && <p className='mt-2 text-rose-500'>{taskError.error.task_name}</p>}
        </div>
        <div className='relative mb-5'>
            <p>Enter your start time</p>
            <input 
                className='p-4 bg-slate-500 rounded-2xl w-full' 
                type="datetime-local" 
                name="start_time" 
                placeholder='Enter date'
                value={todo.start_time || ''}
                onChange={e => {
                    setTodo({
                        ...todo,
                        start_time: e.target.value
                    })

                    if(!e.target.value) {
                        setTaskError({
                            ...taskError,
                            error: {
                                ...taskError.error,
                                start_time: '* Please fill in task start time *'
                            }
                        })
                        return
                    }
                        
                    else if(todo.end_time) {
                        const end_time = new Date(todo.end_time).getTime()
                        const start_time = new Date(e.target.value).getTime()

                        if(end_time < start_time) {
                            setTaskError({
                                ...taskError,
                                error: {
                                    ...taskError.error,
                                    start_time: '* Start time must be before end time *'
                                }
                            })
                            return
                        }
                    }
                    setTaskError({
                        ...taskError,
                        error: {
                            ...taskError.error,
                            start_time: ''
                        }
                    })  
                }}
            />
            {taskError.error.start_time && <p className='mt-2 text-rose-500'>{taskError.error.start_time}</p>}
        </div>
        <div className='relative mb-5'>
            <p>Enter your end time</p>
            <input 
                className='p-4 bg-slate-500 rounded-2xl w-full' 
                type="datetime-local" 
                name="end_time" 
                placeholder='Enter date'
                value={todo.end_time || ''}
                onChange={e => {
                    setTodo({
                        ...todo,
                        end_time: e.target.value
                    })

                    if(!e.target.value) {
                        setTaskError({
                            ...taskError,
                            error: {
                                ...taskError.error,
                                end_time: '* Please fill in task end time *'
                            }
                        })

                        return;
                    }
                    else if(todo.start_time) {
                        const start_time = new Date(todo.start_time).getTime()
                        const end_time = new Date(e.target.value).getTime()

                        if(end_time < start_time) {
                            setTaskError({
                                ...taskError,
                                error: {
                                    ...taskError.error,
                                    end_time: '* End time must be after start time *'
                                }
                            })
                            return
                        }
                    }
                    
                    setTaskError({
                        ...taskError,
                        error: {
                            ...taskError.error,
                            end_time: ''
                        }
                    })  
                }}
            />
            {taskError.error.end_time && <p className='mt-2 text-rose-500'>{taskError.error.end_time}</p>}
        </div>
        <div className='relative mb-5'>
            <p>Enter your task location</p>
            <input 
                className='p-4 bg-slate-500 rounded-2xl w-full' 
                type='text' 
                name="task_location" 
                placeholder='Enter task location (optional)'
                value={todo.task_location || ''}
                onChange={e => {
                    setTodo({
                        ...todo,
                        task_location: e.target.value
                    })
                }}
            />
        </div>
        <div className='relative mb-5'>
            <p>Enter your task description</p>
            <textarea 
                className='p-4 bg-slate-500 rounded-2xl w-full resize-none' 
                rows={5} 
                name="task_description" 
                placeholder='Enter task description (optional)'
                value={todo.task_description || ''}
                onChange={e => {
                    setTodo({
                        ...todo,
                        task_description: e.target.value
                    })
                }}
            />
        </div>
        <div className='relative mb-5'>
            <p>Chose your task status</p>
            <select 
                className='p-4 bg-slate-500 rounded-2xl w-full resize-none' 
                name="task_status" 
                value={todo.task_status || ''}
                onChange={e => {
                    setTodo({
                        ...todo,
                        task_status: e.target.value
                    })
                }}
            >
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
            </select>
        </div>
        <div className='flex flex-wrap gap-4 justify-center'>
            <button 
                type='submit' 
                className='bg-slate-700 p-4 rounded-2xl cursor-pointer hover:bg-lime-800 transition-all duration-500'
                onClick={e => {
                    e.preventDefault()

                    ValidateTask(todo, taskError, setTaskError, setTodoList)
                    ResetTaskForm(setTodo)
                }}
            >
                Save
            </button>
            <button 
                type='reset' 
                className='bg-slate-700 p-4 rounded-2xl cursor-pointer hover:bg-slate-600 transition-all duration-500'
                onClick={e => {
                    e.preventDefault()
                    ResetTaskForm(setTodo)
                }}
            >
                Reset
            </button>
        </div>
    </form>
  )
}

export default ToDoForm