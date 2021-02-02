import { useState } from 'react';
import './ListForm.css'

export default function ({ createList, setShowForm }) {
  const [title, setTitle] = useState("");

  return (
    <div className="dropdown-container">
      <input className="dropdown-input" name="list-entry" type="text" onChange={(e) => setTitle(e.target.value)}></input>
      <button className="dropdown-button" onClick={() => {
        createList(title);
        setShowForm(false);
      }}>Create</button>
    </div>
  )
}
