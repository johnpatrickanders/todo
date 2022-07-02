import { useState, useContext } from 'react';
import './Task.css';
import { UserContext } from '../App';
import SelectedTask from './SelectedTask';

export default function ({ task, setTasksState, tasksState, idx }) {
  const [classNames, setClassNames] = useState(`tasks__task ${task.status === 'Complete' ? " task__done" : ""}`);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [hasFile, setHasFile] = useState(task.fileUrl);
  const { selectedTask, setSelectedTask } = useContext(UserContext);
  const handleTitleClick = async () => {
    if (selectedTask) return;
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
    // onClick={select}
    >
      <div className='task__title'>{taskTitle}</div>
      <div className='task__left'>
        <div className='task__dots'
          onClick={(e) => handleDotsClick(e)}
        >
          <div className='task__dot'></div>
          <div className='task__dot'></div>
          <div className='task__dot'></div>
        </div>
        {hasFile ? <i className='fa task__file__icon'>&#xf15b;</i> : <></>}
        {selectedTask ? <SelectedTask task={task} idx={idx} setTasksState={setTasksState} tasksState={tasksState} setTaskTitle={setTaskTitle} selectedTask={selectedTask} setSelectedTask={setSelectedTask} /> : <div />}
      </div>
      <div className='task__right'>{task.dueWord}</div>
    </div>
  )
}
