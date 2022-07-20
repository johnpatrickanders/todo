import { useState, useEffect, useContext } from 'react';
import './Lists.css';
import Tasks from './Tasks';
import DropDown from './DropDown';
import { UserContext } from '../App';

export default function () {
  const { lists, user } = useContext(UserContext);
  const [listId, setListId] = useState();
  const [listTitle, setListTitle] = useState('Select A List')
  const [liveLists, setLiveLists] = useState(lists);
  const grabListInfo = (id, title) => {
    console.log("KEY:", id)
    console.log("KEY:", title)

    setListId(id);
    setListTitle(title);
  }
  const createList = async (title) => {
    console.log("CREATE LIST");
    const res = await fetch('/list', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
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
            key={String(list.id) + String(list.updateDate)}
            onClick={() => grabListInfo(list.id, list.title)}
            className="lists__title">
            {list.title}
          </div>
        ))}
      </div>
      {<Tasks taskListId={listId} taskListTitle={listTitle} ></Tasks>}
    </>
  )
}
