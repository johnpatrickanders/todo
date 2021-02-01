import { useState, useEffect } from 'react';
import './Lists.css';
import Tasks from './Tasks';

export default function ({ lists, tasks }) {
  const [listId, setListId] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState();
  const grabListId = (id) => {
    console.log("KEY:", id)
    // setListId(id);
    console.log(tasks)
    setFilteredTasks(tasks.filter((task) => task.taskListId === id));
  }
  const createList = async () => {
    console.log("CREATE LIST")
    const res = await fetch('/list', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        title: "Clicky click"
      })
    })
    if (res.ok) {
      const list = await res.json();
      console.log(list)
    }
  }
  // const showTasks = (listId) => {
  //   console.log(listId);
  //   return (listId ? <Tasks tasks={tasks} listd={listId}></Tasks> : null)
  // }
  useEffect(() => {
    setFilteredTasks(tasks);
  }, []);

  return (
    <>
      <div className="main__lists lists">
        <h3 className="lists__header">
          My Lists
          <button onClick={createList} className="lists__button">Add List</button>
        </h3>
        {lists.map((list) => (
          <div
            listid={list.id}
            onClick={() => grabListId(list.id)}
            className="lists__title">
            {list.title}
          </div>
        ))}
      </div>
      {<Tasks tasks={filteredTasks} ></Tasks>}
    </>
  )
}
