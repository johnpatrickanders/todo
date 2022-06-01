import { useState, useEffect } from 'react';
import './Task.css';

export default function ({ task }) {
  // const [done, setDone] = useState(task.status);
  // const [taskState, setTaskState] = useState(task)
  const [classNames, setClassNames] = useState("tasks__task");
  const handleClick = () => {
    // setDone(!done);
    task.status = task.status === 'Open' ? 'Complete' : 'Open';
    setClassNames(`tasks__task ${task.status === 'Complete' ? " task__done" : ""}`);
    // console.log(task.status, classNames)
    // sortByClicked(task.id)
  }

  return (
    <div
      className={classNames}
      onClick={handleClick}
    >
      {task.title}
    </div>
  )
}
