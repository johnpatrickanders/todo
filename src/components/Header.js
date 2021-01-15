import './Header.css';
import todo from '../todo.png';

export default function () {
  return (
    <div className="main__header">
      <div className="header__left">Left</div>
      <div className="header__center">
        <img className="logo" src={todo}></img>
      </div>
      <div className="header__right">Right</div>
    </div>
  )
}
