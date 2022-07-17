import './Header.css';
import todo from '../todo.png';
import { useContext } from 'react';
import { UserContext } from './Main';
import Logout from './Logout'

export default function ({
  dispatchToken
}) {
  const value = useContext(UserContext);

  return (
    <div className="main__header">
      <div className="header__left" key={value.user}>
        {`Welcome, ${value.user.email}`}
      </div>
      <div className="header__center">
        <img className="logo" src={todo}></img>
      </div>
      <div className="header__right">
        <Logout dispatchToken={dispatchToken} />
      </div>
    </div>
  )
}
