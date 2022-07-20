import './Home.css';
import Header from './Header';
import Lists from './Lists';
import Login from './Login'

export default function ({
  dispatchToken,
}) {
  return (
    <div
      className="main">
      <Header
        dispatchToken={dispatchToken}>
      </Header>
      <Lists
      ></Lists>
    </div>
  )
}
