import { useState } from 'react';
import ListForm from './ListForm';
import './DropDown.css';

export default function ({ createList }) {
  const [showForm, setShowForm] = useState(false);

  const pop = () => {
    console.log("POP")
    setShowForm(!showForm);
  }

  return (
    <div className="lists__dropdown">
      <button onClick={pop} className="lists__button">Add List</button>
      <div className="lists__dropdown-content">
        {showForm ? <ListForm createList={createList} /> : null}
      </div>
    </div>
  )
}
