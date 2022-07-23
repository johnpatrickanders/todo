import { useState, useContext, useEffect } from 'react';
import './Task.css';
import SelectedTask from './SelectedTask';
import ImageModal from './ImageModal';

export default function ({ task, setTasksState, tasksState, idx }) {
  const [classNames, setClassNames] = useState(`tasks__task ${task.status === 'Complete' ? " task__done" : ""}`);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [isOpen, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
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

  const handleDotsClick = async (e) => {
    e.stopPropagation();
    if (selectedTask) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
    }
  }

  const loadImageModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  }


  return (
    <div
      className={classNames}
      onClick={handleTitleClick}
    >
      {isOpen ? <ImageModal fileName={task.fileName} setOpen={setOpen} /> : <></>}
      <div className='task__left'>
        <div className='task__title'>{taskTitle}</div>
        <div className='task__dots'
          onClick={(e) => handleDotsClick(e)}
        >
          <div className='task__dot'></div>
          <div className='task__dot'></div>
          <div className='task__dot'></div>
        </div>
        {task.fileName ? <i onClick={(e) => loadImageModal(e)} className='fa task__file__icon'>&#xf15b;</i> : <></>}
        {selectedTask ? <SelectedTask
          task={task}
          idx={idx}
          setTasksState={setTasksState}
          tasksState={tasksState}
          setTaskTitle={setTaskTitle}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        /> : <div />}
      </div>
      <div className='task__right'>{task.dueWord}</div>
    </div>
  )
}
