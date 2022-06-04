import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './components/Main';
import './App.css';

export const UserContext = createContext({
  user: null,
  value: null
});

function App() {
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/home');
      if (res.status >= 200 && res.status < 400) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error('Bad response');
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      const res = await fetch('/tasklists');
      if (res.status >= 200 && res.status < 400) {
        const data = await res.json();
        setLists([...data.tasklists]);
      } else {
        console.error('Bad response');
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <UserContext.Provider value={{ user }}>
                <Main lists={lists} tasks={tasks} />
              </UserContext.Provider>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
