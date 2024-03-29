import { useState, useEffect, useContext } from 'react';
import './Lists.css';
import Tasks from './Tasks';
import DropDown from './DropDown';
import { UserContext } from '../App';
import List from './List';

export default function () {
  const { lists, user, dispatch } = useContext(UserContext);
  const initialListState = { id: null, title: 'Select a List' }
  const [selectedList, setSelectedList] = useState(lists[0] ? lists[0] : initialListState)
  const grabListInfo = (id, title) => {
    setSelectedList({ id, title })
  }
  const createList = async (title) => {
    const res = await fetch('/api/list', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        title
      })
    })
    if (res.ok) {
      const list = await res.json();
      dispatch({
        type: 'lists',
        payload: {
          lists: [...lists, list]
        }
      })
    }
  }

  const resetListState = () => {
    setSelectedList(initialListState);
  }

  useEffect(() => {
    if (!lists.length) {
      resetListState();
    }
  }, [lists]);

  return (
    <>
      <div className="main__lists lists">
        <h3 className="lists__header">
          My Lists
          <DropDown handleCreate={createList} buttonLabel="Add List" />
        </h3>
        {lists.map((list) => (
          <List
            listid={list.id}
            key={String(list.id) + String(list.updateDate)}
            list={list}
            grabListInfo={grabListInfo}
            lists={lists}
            dispatch={dispatch}
            selectedListId={selectedList.id}
            resetListState={resetListState}
          />
        ))}
      </div>

      {<Tasks taskListId={selectedList.id} taskListTitle={selectedList.title} ></Tasks>}
    </>
  )
}
