import './Tasks.css';
import Task from './Task';
import { useEffect, useState } from 'react';

export default function ({ tasks, listId }) {
  let filteredTasks = tasks.filter(task => task.taskListId === listId);

  const sortByDone = (tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.done) {
        const temp = tasks.splice(i, 1);
        tasks.push(...temp)
      }
    }
    console.log(tasks)
  }

  // const sortByClicked = (taskId) => {
  //   const temp = null;
  //   for (let i = 0; i < filteredTasks.length; i++) {
  //     let task = tasks[i];
  //     if (taskId === task.id) {
  //       temp = tasks.splice(taskId, 1);
  //       filteredTasks.push(temp);
  //       return;
  //     }
  //   }
  // }

  useEffect(() => {
    sortByDone(filteredTasks);
  }, [...filteredTasks])

  return (
    <div className="main__tasks tasks"
      onClick={() => sortByDone(filteredTasks)}
    >
      <h3>
        Associated Tasks
      </h3>
      {filteredTasks ? filteredTasks.map(task => (
        <Task task={task}
        // sortByClicked={sortByClicked}
        />
      )) : null}
    </div>
  )
}
