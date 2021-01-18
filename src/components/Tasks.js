import './Tasks.css';

export default function ({ tasks }) {

  return (
    <div className="main__tasks tasks">
      <h3>
        Associated Tasks
      </h3>
      {tasks ? tasks.map(task => (
        <div>
          {task.title}
        </div>
      )) : null}
    </div>
  )
}
