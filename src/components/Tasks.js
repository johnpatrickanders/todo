import './Tasks.css';
import Task from './Task';
import DropDown from './DropDown';
import React, { useEffect, useState } from 'react';

export default function ({ tasks, taskListId }) {
  let [tasksState, setTasksState] = useState(tasks);
  const sortByDone = (tasks) => {
    const tempNorm = [];
    const tempDone = [];
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

  const createTask = async (title) => {
    console.log("CREATE TASK");
    const res = await fetch(`/task?id=${taskListId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title
      })
    })
    if (res.ok) {
      const task = await res.json();
      console.log(task);
      setTasksState([...tasks, task]);
    }
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
        <DropDown createList={createTask} buttonLabel="Add Task" />
        {/* <button className="tasks__button" onClick={createTask}>Add Task</button> */}
      </h3>
      {tasksState ? tasksState.map(task => (
        <Task task={task}
          done={task.done}
          // sortByClicked={sortByClicked}
          key={task.id}
        />
      )) : null}
    </div>
  )
}
