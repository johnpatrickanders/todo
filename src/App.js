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
    // fetch('/home')
    //   .then(res => res.json())
    //   .then(data => setCurrentUser(data))

    async function fetchData() {
      const res = await fetch('/home');
      if (res.status >= 200 && res.status < 400) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error('Bad response');
      }
      // console.log(user);
    }
    fetchData();
  }, [])

  return (
    <>
      <p style={{ backgroundColor: "orange", height: "50px" }}>
        {user ? user.firstname : "loading"}
      </p>
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
