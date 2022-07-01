import './Tasks.css';
import Task from './Task';
import DropDown from './DropDown';
import React, { useEffect, useState } from 'react';

export default function ({ taskListId, taskListTitle }) {
  const [tasksState, setTasksState] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
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

  const toggleCompleted = (e) => {
    console.log(e.target.value);
    setShowCompleted(!showCompleted);
  }

  const updateCompletedClass = () => {

  }

  useEffect(() => {
    if (!taskListId) return;
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
  }, [taskListId]);



  return (
    <div className="main__tasks tasks"
      onClick={() => sortByStatus(tasksState)}
    >
      <h3 className="tasks__header">
        {taskListTitle}

        <label className='toggle__completed' htmlFor='showCompleted'>Hide Completed</label>
        <input
          type='checkbox'
          name='showCompleted'
          checked={!showCompleted}
          value='Toggle Completed'
          onClick={(e) => toggleCompleted(e)}
          onChange={updateCompletedClass}
        />
        <DropDown createList={createTask} buttonLabel="Add Task" />
      </h3>
      {
        tasksState.map((task, idx) => (
          (showCompleted || task.status !== 'Complete') && <Task
            task={task}
            status={task.status}
            key={String(task.id) + String(task.title) + String(task.updateDate)}
            setTasksState={setTasksState}
            tasksState={tasksState}
            idx={idx}
          />
        ))
      }
    </div >
  )
}
