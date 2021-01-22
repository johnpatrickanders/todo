import './Tasks.css';
import Task from './Task';
import { useEffect, useState } from 'react';

export default function ({ tasks, listId }) {
  let filteredTasks = tasks.filter(task => task.taskListId === listId);
  const [tasksState, setTasksState] = useState(tasks);
  const sortByDone = (tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.done) {
        const temp = tasks.splice(i, 1);
        tasks.push(...temp)
      }
    }
    setTasksState(tasks);
    console.log(tasks)
  }

  const sortByClicked = (taskId) => {
    const temp = null;
    for (let i = 0; i < filteredTasks.length; i++) {
      let task = tasks[i];
      if (taskId === task.id) {
        temp = tasks.splice(taskId, 1);
        filteredTasks.push(temp);
        return;
      }
    }
  }

  // useEffect(() => {
  //   setTasksState(tasksState);
  //   console.log("effect")
  // }, [tasksState])
  console.log(tasksState)

  return (
    <div className="main__tasks tasks"
      onClick={() => sortByDone(tasksState)}
    >
      <h3>
        Associated Tasks
      </h3>
      {tasksState ? tasksState.map(task => (
        <Task task={task}
          done={task.done}
        // sortByClicked={sortByClicked}
        />
      )) : null}
    </div>
  )
}
