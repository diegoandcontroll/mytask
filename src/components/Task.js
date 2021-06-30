import React, { useContext} from 'react'
import { TaskListContext } from '../contexts/TaskListContext'

const Task = ({ task }) => {
  const { removeTask, findItem, onTglStatus } = useContext(TaskListContext)
  return (
    <li className="list-item">
      <span>{task.title} </span>
      <div>
        <button
          className="btn-delete task-btn"
          onClick={() => removeTask(task.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>{' '}
        <button className="btn-edit task-btn" onClick={() => findItem(task.id)}>
          <i className="fas fa-pen"></i>
        </button>
        <button className="btn-edit task-btn" onClick={() => onTglStatus(task)}>
          {task.complete && "✅"}
          {!task.complete && "⬜"}
        </button>
      </div>
    </li>
  )
}

export default Task
