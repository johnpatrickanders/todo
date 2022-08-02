import { useState } from 'react';
import ListForm from './CreationForm';
import './DropDown.css';

export default function ({ handleCreate, buttonLabel }) {
  const [showForm, setShowForm] = useState(false);

  const pop = () => {
    setShowForm(!showForm);
  }

  return (
    <div className="lists__dropdown">
      <button onClick={pop} className="lists__button">{buttonLabel}</button>
      <div className="lists__dropdown-content">
        {showForm ? <ListForm create={handleCreate} setShowForm={setShowForm} /> : null}
      </div>
    </div>
  )
}
