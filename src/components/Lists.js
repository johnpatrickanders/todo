import { useState, useEffect, useReducer } from 'react';
import './Lists.css';
import Tasks from './Tasks';
import DropDown from './DropDown';

export default function ({ lists, tasks }) {
  const fetchTasks = async (taskListId) => {
    console.log("FETCH TASKS BY LIST ID");
    const res = await fetch(`/tasks/${taskListId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      //   userId: 1
      // })
    })
    if (res.ok) {
      const tasks = await res.json();
      console.log(tasks);
      return tasks;
    }
    return [];
  }
  async function tasksReducer(state, action) {
    tasks = await fetchTasks(1)
    switch (action.type) {
      case 'fetchTasks': {
        return {
          ...state,
          tasks
        }
      }
      case 'error': {
        return {};
      }
      case 'removeTask': {
        return {
          ...state,
          tasks: tasks.filter(action.payload.listId)
        }
      }
      case 'addTask': {
        return {
          ...state,
          tasks: tasks.append(action.payload.newTask)
        };
      }
      default:
        return { ...state };
    }
  }
  const initialState = {
    tasks: []
  };
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const [listId, setListId] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState();
  const [liveLists, setLiveLists] = useState(lists);



  const grabListId = (id) => {
    console.log("KEY:", id)
    setListId(id);
    console.log(tasks)
    setFilteredTasks(tasks.filter((task) => task.taskListId === id));
  }
  const createList = async (title) => {
    console.log("CREATE LIST")
    const res = await fetch('/list', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        title
      })
    })
    if (res.ok) {
      const list = await res.json();
      console.log(list);
      setLiveLists([...lists, list]);
    }
  }

  useEffect(() => {
    console.log("use effect")
    // setFilteredTasks(tasks);
    setLiveLists(lists);
    console.log(lists, tasks)
  }, [lists]);

  return (
    <>
      <div className="main__lists lists">
        <h3 className="lists__header">
          My Lists
          <DropDown createList={createList} buttonLabel="Add List" />
        </h3>
        {liveLists.map((list) => (
          <div
            listid={list.id}
            onClick={() => dispatch({ type: 'fetchTasks' })}
            className="lists__title">
            {list.title}
          </div>
        ))}
      </div>
      {<Tasks tasks={state.tasks} taskListId={listId} ></Tasks>}
    </>
  )
}
