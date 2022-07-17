import './Home.css';
import Header from './Header';
import Lists from './Lists';
import Login from './Login'
import useToken from '../localToken';

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
