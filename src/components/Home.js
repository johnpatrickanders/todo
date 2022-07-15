import './Home.css';
import Header from './Header';
import Lists from './Lists';
import Login from './Login'
import useToken from './useToken';

export default function ({ removeToken, token, setToken }) {
  return (
    <div
      className="main">
      <Header
        removeToken={removeToken}>
      </Header>
      <Lists
        token={token}
        setToken={setToken}
      ></Lists>
    </div>
  )
}
