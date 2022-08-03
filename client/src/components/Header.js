import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../App';
import Logout from './Logout'

export default function ({
  dispatch
}) {
  const { user } = useContext(UserContext);
  return (
    <div className="main__header">
      <div className="header__left" key={user.id}>
        {`Welcome, ${user.email}
        `}
      </div>
      <div className="header__center">
        <img className="logo" src='/assets/favicon.ico'></img>
      </div>
      <div className="header__right">
        <Logout dispatch={dispatch} />
      </div>
    </div>
  )
}
