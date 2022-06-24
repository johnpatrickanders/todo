import './Tasks.css';
import Task from './Task';
import DropDown from './DropDown';
import React, { useEffect, useState } from 'react';

export default function ({ taskListId }) {
  let [tasksState, setTasksState] = useState([]);
  const sortByStatus = (tasks) => {
    const tempNorm = [];
    const tempStatus = [];
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      if (task.status == 'Complete') {
        tempStatus.push(task);
      } else {
        tempNorm.push(task);
      }
    }
    return setTasksState([...tempNorm, ...tempStatus]);
  }

  const createTask = async (title) => {
    const res = await fetch(`/task/${taskListId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title
      })
    })
    if (res.ok) {
      const { task } = await res.json();
      setTasksState([...tasksState, task]);
    }
  }


  useEffect(() => {
    console.log("NEW TASKS");
    async function fetchData() {
      const res = await fetch(`/tasks/${taskListId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        const { tasks } = await res.json();
        sortByStatus([...tasks]);
      } else {
      }
    }
    fetchData();
  }, [taskListId])

  return (
    <div className="main__tasks tasks"
      onClick={() => sortByStatus(tasksState)}
    >
      <h3 className="tasks__header">
        Associated Tasks
        <DropDown createList={createTask} buttonLabel="Add Task" />
        {/* <button className="tasks__button" onClick={createTask}>Add Task</button> */}
      </h3>
      {tasksState.map((task, idx) => (
        <Task task={task}
          status={task.status}
          key={String(task.id) + String(task.title) + String(task.updateDate)}
          setTasksState={setTasksState}
          tasksState={tasksState}
          idx={idx}
        />
      ))}
    </div>
  )
}
