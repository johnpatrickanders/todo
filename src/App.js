import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import localToken from './localToken';
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

const initialState = { token: null };
function tokenReducer(state, action) {
  const { saveToken, removeToken, getToken } = localToken;
  switch (action.type) {
    case 'logout':
      removeToken()
      return { token: null };
    case 'login':
      const newToken = saveToken(action.payload);
      return { token: newToken };
    case 'get':
      return { token: getToken() }
    default:
      throw new Error();
  }
}
function App() {

  const [tokenState, dispatchToken] = useReducer(tokenReducer, initialState);

  return (
    <BrowserRouter>
      <div >
        {
          // !(tokenState.token && tokenState.token !== "" && tokenState.token !== undefined) ?
          !tokenState.token && (<Route exact={true} path="*">
            <Login dispatchToken={dispatchToken} />
          </Route>)}
        {/* // : */}
        {tokenState.token &&
          <Route path="/home" exact={true}>
            <Main
              dispatchToken={dispatchToken}
              token={tokenState.token}
            ></Main>
          </Route>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
