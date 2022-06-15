import './Main.css';
import './SelectedTask.css'

export default function ({ task, selectedTask }) {
  return (
    selectedTask && selectedTask.id == task.id ?
      <div
        className="task__selectedtask">
        <div className='selectedtask__line'>
          {`Tag: ${selectedTask.tag}`}
        </div>
        <div>
          {`Created: ${selectedTask.create_date}`}
        </div>
        <div>
          {`Due: ${selectedTask.due_date}`}
        </div>
        <div>
          {`Remind: ${selectedTask.remind_date}`}
        </div>
        <div>
          {'Delete:'} < input type="checkbox" checked="" />
        </div>
      </div>
      :
      <></>

  )
}
