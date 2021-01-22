import { useState, useEffect } from 'react';
import './Task.css';

export default function ({ task }) {
  // const [done, setDone] = useState(task.done);
  // const [taskState, setTaskState] = useState(task)
  const [classNames, setClassNames] = useState("tasks__task");
  const handleClick = () => {
    // setDone(!done);
    task.done = !task.done;
    setClassNames(`tasks__task ${task.done ? " task__done" : ""}`);
    // console.log(task.done, classNames)
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
