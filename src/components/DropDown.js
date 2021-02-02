import { useState } from 'react';
import './DropDown.css';

export default function ({ createList }) {
  const [showForm, setShowForm] = useState(false);

  const pop = () => {
    console.log("POP")
    setShowForm(true);
  }

  return (
    <div className="lists__dropdown">
      <button onClick={pop} className="lists__button">Add List</button>
      <div className="lists__dropdown-content">
        {showForm ? <h1>
          Hello There
        </h1> : null}
      </div>
    </div>
  )
}
