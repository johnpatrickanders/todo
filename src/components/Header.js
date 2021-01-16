import './Header.css';
import todo from '../todo.png';

export default function ({ user }) {
  console.log(user)
  return (
    <div className="main__header">
      <div className="header__left" key={user}>
        {`Welcome, ${user.firstname} ${user.lastname}`}
      </div>
      <div className="header__center">
        <img className="logo" src={todo}></img>
      </div>
      <div className="header__right">Right</div>
    </div>
  )
}
