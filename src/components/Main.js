import React from 'react';
import './Main.css';
import Header from './Header';
import Lists from './Lists';



function Main({
  dispatch
}) {

  return (
    <div>
      <div
        className="main">
        <Header
          dispatch={dispatch}>
        </Header>
        <Lists
        ></Lists>
      </div>
    </div>
  );
}

export default Main;
