import { useState } from 'react';
import './Task.css';

export default function ({ task }) {
  const [classNames, setClassNames] = useState("tasks__task");
  const handleClick = () => {
    task.status = task.status === 'Open' ? 'Complete' : 'Open';
    setClassNames(`tasks__task ${task.status === 'Complete' ? " task__done" : ""}`);
    console.log(task.status, classNames)
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
