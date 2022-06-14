import './Main.css';
import './SelectedTask.css'

export default function ({ task, selectedTask }) {
  return (
    selectedTask && selectedTask.id == task.id ?
      <div
        className="task__selectedtask .hover">
        {selectedTask.create_date}
      </div>
      :
      <></>

  )
}
