import React, { useState, useEffect } from 'react';

const [user, setCurrentUser] = useState(0);

useEffect(() => {
  // fetch('/home')
  //   .then(res => res.json())
  //   .then(data => setCurrentUser(data))

  (async function fetchData() {
    const res = await fetch('/home');
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      setCurrentUser(data);
    } else {
      console.error('Bad response');
    }
    console.log(user);
  })()
  // console.log(user);
}, [])

const MainContext = React.createContext("hi");
