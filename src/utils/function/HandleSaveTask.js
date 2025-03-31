export function ValidateTask(todo, taskError, setTaskError, setTodoList) {

    if(!todo.start_time || !todo.end_time || !todo.task_name) {

        setTaskError({
            ...taskError,
            error: {
                ...taskError.error,
                task_name: 'Please fill in task name',
                end_time: 'Please fill in task end time',
                start_time: 'Please fill in task start time',
            }
        })

    }

    else {

        setTaskError({
            ...taskError,
            error: {}
        })

        const todoList = JSON.parse(window.localStorage.getItem('todo_list'))

        if(todoList) {

            todoList.push(todo)

            window.localStorage.setItem('todo_list', JSON.stringify(todoList))
        }
        else {

            window.localStorage.setItem('todo_list', JSON.stringify([todo]))
        }

        setTodoList(JSON.parse(window.localStorage.getItem('todo_list')))
    }

}

export function ResetTaskForm(setTodo) {

    setTodo({
        task_status: 'Pending'
    })

}