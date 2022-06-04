import './Header.css';
import todo from '../todo.png';
import { useContext } from 'react';
import { UserContext } from '../App';

export default function (
  // { user }
) {
  const value = useContext(UserContext);
  console.log(value)

  return (
    <div className="main__header">
      <div className="header__left" key={value.user}>
        {`Welcome, ${value.user.firstname} ${value.user.lastname}`}
      </div>
      <div className="header__center">
        <img className="logo" src={todo}></img>
      </div>
      <div className="header__right">Right</div>
    </div>
  )
}
