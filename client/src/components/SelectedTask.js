import './SelectedTask.css';
import { useState } from 'react';
import ImagePicker from './ImagePicker';

export default function ({
  task,
  selectedTask,
  setSelectedTask,
  setTasksState,
  tasksState,
  leftPropertySelectedTask
}) {
  const [title, setTitle] = useState(selectedTask.title || '');
  const [tag, setTag] = useState(selectedTask.tag || '');
  const [createDate, setCreateDate] = useState(selectedTask.createDate || '');
  const [dueDate, setDueDate] = useState(selectedTask.dueDate || '');
  const [remindDate, setRemindDate] = useState(selectedTask.remindDate || '');

  const [selectedFile, setSelectedFile] = useState();

  const handleTaskUpdate = async () => {
    const res = await fetch(`/api/tasks/${selectedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tag,
        createDate,
        dueDate,
        remindDate,
        title,
        fileName: selectedFile ? selectedTask.id + "-task-image" : null
      })
    })
    if (res.ok) {
      const { updatedTask, preSignedPostS3 } = await res.json();
      if (preSignedPostS3) {
        await uploadToS3(preSignedPostS3.url, preSignedPostS3.fields);
      }
      const newTasks = tasksState.map(task => {
        if (task.id === updatedTask.id) {
          return Object.assign({}, updatedTask);
        } else {
          return task;
        }
      })
      setTasksState([...newTasks]);
      setSelectedTask(null);
    }
  }
  const handleTaskDelete = async () => {
    const res = await fetch(`/api/task/${selectedTask.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      const { deletedTask } = await res.json();
      const newTasks = tasksState.filter(el => {
        if (el.id !== selectedTask.id) {
          return el;
        };
      });
      setTasksState([...newTasks]);
      setSelectedTask(null);
    };
  }

  const handleChange = (e, setCallback) => {
    setCallback(e.target.value);
  }

  // TODO: to modify for uploadToS3 on error
  const postFileName = async (fileName) => {
    const res = await fetch(`/api/post_success/${selectedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: selectedTask.id + "-task-image"
      })
    })
    if (res.ok) {
      console.log("fileName added: ", fileName);
    }
  }

  const uploadToS3 = async (url, fields) => {
    const formData = new FormData();
    for (const [key, val] of Object.entries(fields)) {
      formData.append(key, val);
    }
    formData.append('file', selectedFile);
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
    if (res.ok) {
      // postFileName(fields.key);
    } else {
      // TODO: handle error by removing task's fileName in backend
      // postFileName('')
    }
  }

  const handleSubmission = async () => {
    const res = await fetch('/api/sign_s3_post', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: selectedTask.id + selectedFile.name,
        fileType: selectedFile.type
      })
    });
    if (res.ok) {
      const { fields, url } = await res.json();
      uploadToS3(url, fields);
    }
  }

  return (
    selectedTask && selectedTask.id === task.id ?
      <div
        className="task__selectedtask"
        style={{ left: leftPropertySelectedTask }}
      >
        <div className='selectedtask__container'>
          <div className='selectedtask__line' >
            Title: <input type="text" value={title} onChange={(e) => handleChange(e, setTitle)} />
          </div>
          <div className='selectedtask__line' >
            Tag: <input type="text" value={tag} onChange={(e) => handleChange(e, setTag)} />
          </div>
          <div className='selectedtask__line'>
            Created: <input type="date" value={createDate} onChange={(e) => handleChange(e, setCreateDate)} />
          </div>
          <div className='selectedtask__line'>
            Due: <input type="date" value={dueDate} onChange={(e) => handleChange(e, setDueDate)} />
          </div>

          {/* // TODO: implement reminders
          <div className='selectedtask__line'>
            Remind: <input type="date" value={remindDate} onChange={(e) => handleChange(e, setRemindDate)} />
          </div> */}
          <div className='selectedtask__line image__form'>
            File: <ImagePicker
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              handleSubmission={handleSubmission}
            />
          </div>
          <button className="lists__button" onClick={handleTaskUpdate}>Update Task</button>
          <button className="selectedtask__delete" onClick={handleTaskDelete}>Delete Task</button>
        </div>
      </div>
      :
      <></>

  )
}
