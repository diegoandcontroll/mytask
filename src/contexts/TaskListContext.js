import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuid'

export const TaskListContext = createContext()

const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem('tasks')) || []

  const [tasks, setTasks] = useState(initialState)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [editItem, setEditItem] = useState(null)

  const addTask = title => {
    setTasks([...tasks, { title, id: uuid(), complete: false }])
  }

  const onTglStatus = (task) => {
    setTasks(
      tasks.map((chkTask) => {
        chkTask.complete =
          task.id === chkTask.id ? !chkTask.complete : chkTask.complete;
        return chkTask;
      })
    );
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const clearList = () => {
    setTasks([])
  }

  const findItem = id => {
    const item = tasks.find(task => task.id === id)

    setEditItem(item)
  }

  const editTask = (title, id) => {
    const newTasks = tasks.map(task => (task.id === id ? { title, id} : task))
    setTasks(newTasks)
    setEditItem(null)
  }

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
        onTglStatus
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider
