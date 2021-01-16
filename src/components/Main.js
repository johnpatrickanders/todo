// import React from 'react';

import './Main.css';
import Header from './Header';
import Lists from './Lists';
import Tasks from './Tasks';

export default function () {
  return (
    <div className="main">
      {/* <h1>HELLO WORLD</h1> */}
      <Header ></Header>
      {/* <div className="main__lists"><p>two</p></div> */}
      <Lists ></Lists>
      {/* <div className="main__tasks"><p>three</p></div> */}
      <Tasks></Tasks>
    </div>
  )
}
