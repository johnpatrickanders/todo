import { useState, useContext, useEffect } from 'react';
import './Task.css';
import SelectedTask from './SelectedTask';
import ImageModal from './ImageModal';

export default function ({
  task,
  setTasksState,
  tasksState,
  idx,
  selectedTask,
  setSelectedTask
}) {
  const [classNames, setClassNames] = useState(`tasks__task ${task.status === 'Complete' ? " task__done" : ""}`);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [isOpen, setOpen] = useState(false);
  const [leftPropertySelectedTask, setLeftPropertySelectedTask] = useState(0);
  const handleTitleClick = async () => {
    if (selectedTask) return;
    task.status = task.status === 'Open' ? 'Complete' : 'Open';
    await fetch(`/api/tasks/${task.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        status: task.status,
        taskListId: task.listId
      })
    })
    setClassNames(`tasks__task ${task.status === 'Complete' ? "task__done " : ""}`);
  }

  const handleDotsClick = async (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const width = window.innerWidth - 35;
    const selectedTaskWidth = 364;
    const listsMainWidth = 385;
    const leftValueToSet = Math.min(width - (selectedTaskWidth) * 2, rect.left - listsMainWidth);
    setLeftPropertySelectedTask(leftValueToSet);

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
          leftPropertySelectedTask={leftPropertySelectedTask}
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
