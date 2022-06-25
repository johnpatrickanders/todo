import { useState } from 'react';
import './ListForm.css'

export default function ({ task }) {
  const [title, setTitle] = useState("");

  return (
    <div className="dropdown-container">
      <input type="file" id="file_input" />
      <p id="status">Please select a file</p>
      <img id="preview" src="/static/default.png" />
      <form method="POST" action="/submit_form/">
        <input
          type="hidden"
          id="avatar-url"
          name="avatar-url"
          defaultValue="/static/default.png"
        />
        <input type="text" name="username" placeholder="Username" />
        <input type="text" name="full-name" placeholder="Full name" />
        <input type="submit" defaultValue="Update profile" />
      </form>
    </div>
  )
}
