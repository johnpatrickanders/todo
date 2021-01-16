import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './components/Main';
import './App.css';

function App() {
  const [user, setUser] = useState({});

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

  return (
    <>
      <Router>
        <div>
          {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <Main user={user} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
