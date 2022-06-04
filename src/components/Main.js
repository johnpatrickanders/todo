import './Main.css';
import Header from './Header';
import Lists from './Lists';
import Tasks from './Tasks';
import App from '../App';

export default function ({ tasks }) {
  return (
    <div
      className="main">
      <Header>
      </Header>
      <Lists tasks={tasks}></Lists>
      {/* <Tasks tasks={tasks} taskListId={lists.id}></Tasks> */}
    </div>
  )
}
