import './Tasks.css';
import Task from './Task';
import React, { useEffect, useState } from 'react';

export default function ({ tasks }) {
  let [tasksState, setTasksState] = useState();
  const sortByDone = (tasks) => {
    const tempNorm = [];
    const tempDone = []
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.done) {
        tempDone.push(task);
      } else {
        tempNorm.push(task);
      }
    }
    return setTasksState([...tempNorm, ...tempDone]);
  }

  const createTask = () => {
    console.log("CREATE TASK");
  }


  useEffect(() => {
    setTasksState(tasks);
  }, [tasks])

  return (
    <div className="main__tasks tasks"
      onClick={() => sortByDone(tasksState)}
    >
      <h3 className="tasks__header">
        Associated Tasks
        <button className="tasks__button" onClick={createTask}>Add Task</button>
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
