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
  token,
  dispatch
}) {
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetcher('/home');
  //     if (res.status >= 200 && res.status < 400) {
  //       const data = await res.json();
  //       setUser(data);
  //       console.log(user)
  //     } else {
  //       console.error('Bad response');
  //     }
  //   }
  //   fetchData();
  //   console.log(token)
  // }, [])

  // useEffect(() => {
  //   if (!user) return;
  //   async function fetchData() {
  //     const res = await fetcher('/tasklists');
  //     if (res.status >= 200 && res.status < 400) {
  //       const data = await res.json();
  //       if (data.tasklists) {
  //         setLists([...data.tasklists]);
  //         console.log(data);
  //         setUser({ ...data.user })
  //       } else {
  //         console.error('Bad response');
  //       }
  //     }
  //     fetchData();
  //   }
  // }, []);

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
