import './Main.css';
import { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import './SelectedTask.css'

export default function () {
  const { selectedTask } = useContext(UserContext);
  return (
    selectedTask ?
      <div
        className="main__selectedtask">
        {selectedTask.create_date}
      </div>
      :
      <></>

  )
}
