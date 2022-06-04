// import { useContext } from 'react';
// import { UserContext } from '../App';

import './Main.css';
import Header from './Header';
import Lists from './Lists';
import Tasks from './Tasks';
import App from '../App';

export default function ({ lists, tasks }) {
  // const value = useContext(UserContext);
  // console.log(value)
  return (
    <div
      className="main">
      <Header
      // user={value.user}
      >
      </Header>
      <Lists lists={lists} tasks={tasks}></Lists>
      {/* <Tasks tasks={tasks} taskListId={lists.id}></Tasks> */}
    </div>
  )
}
