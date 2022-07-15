import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import useToken from './components/useToken';
import Main from './components/Main';

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div >
        {
          !token && token !== "" && token !== undefined ?
            <Login setToken={setToken} /> :
            <Switch>
              <Route path="/" >
                <Main removeToken={removeToken} token={token} setToken={setToken} />
              </Route>
            </Switch>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
