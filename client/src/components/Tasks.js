import './Tasks.css';
import Task from './Task';
import DropDown from './DropDown';
import React, { useEffect, useState } from 'react';

export default function ({ taskListId, taskListTitle }) {
  const [tasksState, setTasksState] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
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
    const res = await fetch(`/api/task/${taskListId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title
      })
    })
    if (res.ok) {
      const { task } = await res.json();
      sortByStatus([...tasksState, task]);
    } else {
    }
  }

  const toggleCompleted = (e) => {
    setShowCompleted(!showCompleted);
  }

  const updateCompletedClass = () => {

  }

  useEffect(() => {
    if (!taskListId) {
      setTasksState([]);
      return;
    }
    async function fetchData() {
      const res = await fetch(`/api/tasks/${taskListId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        const { tasks } = await res.json();
        tasks ? sortByStatus([...tasks]) : sortByStatus([]);
      }
    }
    fetchData();
  }, [taskListId]);



  return (
    <div className="main__tasks tasks"
      onClick={() => sortByStatus(tasksState)}
    >
      <h3 className="tasks__header">
        <div className='tasks__list__title'>
          {taskListTitle}
        </div>
        {taskListId &&
          <>
            <label className='toggle__completed' htmlFor='showCompleted'>Hide Completed</label>
            <input
              type='checkbox'
              name='showCompleted'
              checked={!showCompleted}
              value='Toggle Completed'
              onClick={(e) => toggleCompleted(e)}
              onChange={updateCompletedClass}
            />
            <DropDown handleCreate={createTask} buttonLabel="Add Task" />
          </>
        }

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
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        ))
      }
    </div >
  )
}
