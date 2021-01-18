import { useState, useEffect } from 'react';
import './Lists.css';
import Tasks from './Tasks';

export default function ({ lists, tasks }) {
  const [listId, setListId] = useState(0);
  const grabListId = (e) => {
    console.log("KEY:", e.target.listid)
    setListId(e.target);
  }
  const showTasks = (listId) => {
    console.log(listId);
    return (listId ? <Tasks tasks={tasks} listd={listId}></Tasks> : null)
  }
  useEffect(() => {

  }, [listId])

  return (
    <>
      <div className="main__lists lists">
        <h3>
          My Lists
      </h3>
        {lists.map((list) => (
          <div
            listid={list.id}
            onClick={() => setListId(list.id)}
            className="lists__title">
            {list.title}
          </div>
        ))}
      </div>
      {listId ? <Tasks tasks={tasks} listId={listId}></Tasks> : null}
    </>
  )
}
