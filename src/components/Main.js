import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import './Home.css';
import Header from './Header';
import Lists from './Lists';
import fetcher from './fetcher';



function Main({
  userState,
  dispatch
}) {
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  useEffect(() => {
    // if (!userState.token || userState.lists) return;
    async function fetchData() {
      const res = await fetcher('/home');
      if (res.status >= 200 && res.status < 400) {
        const { user, tasklists } = await res.json();
        // setUser(data);
        console.log(user)
        dispatch({
          type: 'get', payload: {
            user,
            lists: tasklists
          }
        })
      } else {
        console.error('Bad response');
      }
    }
    fetchData();
  }, [userState.token])




  return (
    <div>
      {/* <UserContext.Provider value={{ user, lists, selectedTask, setSelectedTask, dispatch }} > */}
      <div
        className="main">
        <Header
          dispatch={dispatch}>
        </Header>
        <Lists
        ></Lists>
      </div>
      {/* </UserContext.Provider> */}
    </div>
  );
}

export default Main;
