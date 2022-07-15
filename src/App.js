import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import useToken from './components/useToken';
import Main from './components/Main';
import { useReducer } from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      !rest.token
        ? <Redirect to='/login' />
        : <Component {...props} />
    )
    } />
  )
}

function App() {
  const { saveToken, removeToken, getToken } = useToken();
  const initialState = { token: null };

  function tokenReducer(state, action) {
    switch (action.type) {
      case 'logout':
        removeToken();
        return { token: null };
      case 'login':
        const newToken = saveToken(action.payload);
        console.log(newToken)
        return { token: newToken };
      case 'get':
        return { token: getToken() }
      default:
        throw new Error();
    }
  }
  const [tokenState, dispatchToken] = useReducer(tokenReducer, initialState);

  return (
    <BrowserRouter>
      <div >
        {
          !tokenState.token && tokenState.token !== "" && tokenState.token !== undefined ?
            <Route path="/login">
              <Login setToken={dispatchToken} />
            </Route>
            :
            <Switch>
              <PrivateRoute
                path="/home" exact={true}
                removeToken={removeToken}
                token={tokenState.token}
                setToken={dispatchToken}
                component={Main}
              />
            </Switch>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
