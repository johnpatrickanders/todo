import './Home.css';
import Header from './Header';
import Lists from './Lists';
import Login from './Login'
import useToken from './useToken';

export default function ({ removeToken }) {
  // const { removeToken } = useToken();
  return (
    <div
      className="main">
      <Header token={removeToken}
      >
      </Header>
      <Lists
      // token={token} setToken={setToken}
      ></Lists>
    </div>
  )
}
