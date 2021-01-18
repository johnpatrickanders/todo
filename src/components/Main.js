// import React from 'react';

import './Main.css';
import Header from './Header';
import Lists from './Lists';
import Tasks from './Tasks';

export default function ({ user, lists, tasks }) {
  return (
    <div
      className="main">
      <Header user={user}>
      </Header>
      <Lists lists={lists}></Lists>
      <Tasks tasks={tasks}></Tasks>
    </div>
  )
}
