import { useState } from 'react';
import './Task.css';

export default function ({ task }) {
  const [classNames, setClassNames] = useState(`tasks__task ${task.status === 'Complete' ? " task__done" : ""}`);
  const handleClick = async () => {
    task.status = task.status === 'Open' ? 'Complete' : 'Open';
    await fetch(`tasks/${task.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        status: task.status,
        taskListId: task.listId
      })
    })
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
