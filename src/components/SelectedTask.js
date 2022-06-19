import './Main.css';
import './SelectedTask.css';
import DropDown from './DropDown';
import { useState } from 'react';

export default function ({ task, selectedTask, setTaskTitle }) {
  const [title, setTitle] = useState(selectedTask.title);
  const [tag, setTag] = useState(selectedTask.tag ? selectedTask.tag : '');
  const [createDate, setCreateDate] = useState(selectedTask.createDate ? selectedTask.createDate : '');
  const [dueDate, setDueDate] = useState(selectedTask.dueDate ? selectedTask.dueDate : '');
  const [remindDate, setRemindDate] = useState(selectedTask.dueDate ? selectedTask.dueDate : '');
  const [deleteStatus, setDeleteStatus] = useState(false);
  const handleTaskUpdate = async () => {
    console.log("UPDATE TASK");
    const res = await fetch(`/tasks/${selectedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tag,
        createDate,
        dueDate,
        remindDate,
        title
      })
    })
    if (res.ok) {
      const { task } = await res.json();
      console.log(task);
      setTaskTitle(title);
    }
  }
  const handleChange = (e, setCallback) => {
    setCallback(e.target.value);
  }
  const onDeleteClick = () => {
    setDeleteStatus(!deleteStatus)
  }
  return (
    selectedTask && selectedTask.id == task.id ?
      <div
        className="task__selectedtask"
      >
        <div className='selectedtask__line' >
          Title: <input type="text" value={title} onChange={(e) => handleChange(e, setTitle)} />
        </div>
        <div className='selectedtask__line' >
          Tag: <input type="text" value={tag} onChange={(e) => handleChange(e, setTag)} />
        </div>
        <div>
          Created: <input type="date" value={createDate} onChange={(e) => handleChange(e, setCreateDate)} />
        </div>
        <div>
          Due: <input type="date" value={dueDate} onChange={(e) => handleChange(e, setDueDate)} />
        </div>
        <div>
          Remind: <input type="date" value={remindDate} onChange={(e) => handleChange(e, setRemindDate)} />
        </div>
        <div>
          Delete: < input type="checkbox" checked={deleteStatus} onChange={onDeleteClick} />
        </div>
        <button className="lists__button" onClick={handleTaskUpdate}>Update Task</button>
      </div>
      :
      <></>

  )
}
