import './Tasks.css';
import Task from './Task';
import React, { useEffect, useState } from 'react';

export default function ({ tasks, listId }) {
  let [tasksState, setTasksState] = useState(tasks);
  const sortByClicked = (taskId) => {
    const temp = null;
    for (let i = 0; i < tasksState.length; i++) {
      let task = tasks[i];
      if (taskId === task.id) {
        temp = tasks.splice(taskId, 1);
        return tasksState.concat(temp);
      }
    }
  }
  console.log(typeof tasks)
  const sortByDone = (tasks) => {
    const tempNorm = [];
    const tempDone = []
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.done) {
        // const temp = tasks.splice(i, 1);
        tempDone.push(task);
      } else {
        tempNorm.push(task);
      }
    }
    // console.log(tempArr);
    return setTasksState([...tempNorm, ...tempDone]);
  }


  useEffect(() => {
    setTasksState(tasks);
    console.log("effect")
  }, [tasks])
  console.log(tasksState)

  return (
    <div className="main__tasks tasks"
      onClick={() => sortByDone(tasksState)}
    >
      <h3>
        Associated Tasks
      </h3>
      { tasksState ? tasksState.map(task => (
        <Task task={task}
          done={task.done}
          // sortByClicked={sortByClicked}
          key={task.id}
        />
      )) : null}
    </div>
  )
}
