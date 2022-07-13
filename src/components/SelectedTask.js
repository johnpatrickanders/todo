import './Main.css';
import './SelectedTask.css';
import { useState } from 'react';
import ImagePicker from './ImagePicker';

export default function ({
  task,
  selectedTask,
  setSelectedTask,
  setTasksState,
  tasksState
}) {
  const [title, setTitle] = useState(selectedTask.title);
  const [tag, setTag] = useState(selectedTask.tag ? selectedTask.tag : '');
  const [createDate, setCreateDate] = useState(selectedTask.createDate ? selectedTask.createDate : '');
  const [dueDate, setDueDate] = useState(selectedTask.dueDate ? selectedTask.dueDate : '');
  // const [dueWord, setDueWord] = useState(selectedTask.dueWord ? selectedTask.dueWord : '');
  const [remindDate, setRemindDate] = useState(selectedTask.remindDate ? selectedTask.remindDate : '');
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [returnedGetUrl, setReturnedGetUrl] = useState();
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
        title,
        fileName: selectedTask.id + "-task-image"
      })
    })
    if (res.ok) {
      const { updatedTask, preSignedPostS3 } = await res.json();
      if (preSignedPostS3.url) {
        await uploadToS3(preSignedPostS3.url, preSignedPostS3.fields);
      }
      const newTasks = tasksState.map(el => {
        if (el.id === updatedTask.id) {
          console.log("MATCH");
          return Object.assign({}, updatedTask);
        } else {
          return el;
        }
      })
      setTasksState([...newTasks]);
      setSelectedTask(null);
    }
  }
  const handleTaskDelete = async () => {
    const res = await fetch(`/task/${selectedTask.id}`, {
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
  const onDeleteClick = () => {
    setDeleteStatus(!deleteStatus)
  };

  // to modify for uploadToS3 error handle
  const postFileName = async (fileName) => {
    const res = await fetch(`/post_success/${selectedTask.id}`, {
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
    console.log(fields)
    formData.append('file', selectedFile);
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
    if (res.ok) {
      console.log('uploaded...');
      // postFileName(fields.key);
    } else {
      // TODO: handle error by removing task's fileName in backend
    }
  }

  const handleSubmission = async () => {
    console.log(selectedFile.file);
    const res = await fetch('/sign_s3_post', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: selectedTask.id + "-task-image",
        fileType: selectedFile.type
      })
    });
    if (res.ok) {
      const { fields, url } = await res.json();
      console.log(fields);

      uploadToS3(url, fields);
    }
  }

  return (
    selectedTask && selectedTask.id === task.id ?
      <div
        className="task__selectedtask"
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
          <div className='selectedtask__line'>
            Remind: <input type="date" value={remindDate} onChange={(e) => handleChange(e, setRemindDate)} />
          </div>
          <div className='selectedtask__line image__form'>
            File: <ImagePicker
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              handleSubmission={handleSubmission}
            />
          </div>
          {/* <div>
          Delete: < input type="checkbox" checked={deleteStatus} onChange={onDeleteClick} />
        </div> */}
          <button className="lists__button" onClick={handleTaskUpdate}>Update Task</button>
          <button className="selectedtask__delete" onClick={handleTaskDelete}>Delete Task</button>
        </div>
      </div>
      :
      <></>

  )
}
