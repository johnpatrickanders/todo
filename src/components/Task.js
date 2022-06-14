import { useState, useContext } from 'react';
import './Task.css';
import { UserContext } from '../App';
import SelectedTask from './SelectedTask';

export default function ({ task }) {
  const [classNames, setClassNames] = useState(`tasks__task ${task.status === 'Complete' ? " task__done" : ""}`);
  // const [hover, setHover] = useState('');
  const { selectedTask, setSelectedTask } = useContext(UserContext);
  const handleTitleClick = async () => {
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
    setClassNames(`tasks__task ${task.status === 'Complete' ? "task__done " : ""}`);
    console.log(task.status, classNames)
  }

  const handleDotsClick = async (event) => {
    event.stopPropagation();
    // if (!hover) {
    //   setHover('.hover');
    //   setClassNames(classNames + hover);
    // } else {
    //   setHover('');
    //   classNames.split(' ').filter(el => el !== '.hover');
    //   console.log(classNames)
    //   setClassNames(classNames);
    // }
    // console.log('Clicking dots . . .', task);
    if (selectedTask) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
    }
  }

  return (
    <div
      className={classNames}
      onClick={handleTitleClick}
    >
      {task.title}
      <div className='task__dots'
        onClick={(e) => handleDotsClick(e)}
      >
        <div className='task__dot'></div>
        <div className='task__dot'></div>
        <div className='task__dot'></div>
      </div>
      {selectedTask ? <SelectedTask task={task} selectedTask={selectedTask} /> : <div />}
    </div>
  )
}
