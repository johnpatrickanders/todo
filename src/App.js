import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(async () => {
    const res = await fetch('/time');
    const data = await res.json();
    setCurrentTime(data.time);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <logo />
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;
