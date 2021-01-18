import './Tasks.css';

export default function ({ tasks, listId }) {

  let filteredTasks = tasks.filter(task => task.taskListId === listId);
  // console.log()
  return (
    <div className="main__tasks tasks">
      <h3>
        Associated Tasks
      </h3>
      {filteredTasks ? filteredTasks.map(task => (
        <div >
          {task.title}
        </div>
      )) : null}
    </div>
  )
}
