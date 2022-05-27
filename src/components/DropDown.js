import { useState } from 'react';
import ListForm from './ListForm';
import './DropDown.css';

export default function ({ createList, buttonLabel }) {
  const [showForm, setShowForm] = useState(false);

  const pop = () => {
    console.log("POP")
    setShowForm(!showForm);
  }

  return (
    <div className="lists__dropdown">
      <button onClick={pop} className="lists__button">{buttonLabel}</button>
      <div className="lists__dropdown-content">
        {showForm ? <ListForm create={createList} setShowForm={setShowForm} /> : null}
      </div>
    </div>
  )
}
