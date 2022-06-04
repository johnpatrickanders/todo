import { useState, useEffect, useContext } from 'react';
import './Lists.css';
import Tasks from './Tasks';
import DropDown from './DropDown';
import { UserContext } from '../App';

export default function () {
  const { lists } = useContext(UserContext);
  const [listId, setListId] = useState(1);
  const [liveLists, setLiveLists] = useState(lists);
  const grabListId = (id) => {
    console.log("KEY:", id)
    setListId(id);
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
    setLiveLists(lists);
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
            onClick={() => grabListId(list.id)}
            className="lists__title">
            {list.title}
          </div>
        ))}
      </div>
      {<Tasks taskListId={listId} ></Tasks>}
    </>
  )
}
