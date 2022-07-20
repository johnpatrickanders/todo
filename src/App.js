import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import localToken from './localToken';
import Main from './components/Main';
import LoggedOutView from './LoggedOutView';
import Signup from './components/Signup';
import { useReducer, useState, createContext, useEffect } from 'react';

export const UserContext = createContext({
  user: {},
  lists: [],
  tasks: null,
  value: null,
  selectedTask: null
});

const { saveToken, removeToken, getToken } = localToken;
const initialState = { token: getToken(), user: {}, lists: [] };

function tokenReducer(state, action) {
  switch (action.type) {
    case 'logout':
      removeToken()
      return { token: null, user: {}, lists: [] };
    case 'login':
      const newToken = saveToken(action.payload.token);
      return {
        // token: newToken,
        user: action.payload.user,
        lists: action.payload.lists
      };
    case 'get':
      return {
        token: getToken(),
        user: action.payload.user,
        lists: action.payload.lists
      }
    default:
      throw new Error();
  }
};

function App() {
  const [userState, dispatch] = useReducer(tokenReducer, initialState);
  const [selectedTask, setSelectedTask] = useState(null);


  return (
    <BrowserRouter>
      <div >
        {
          !userState.user.id &&
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <LoggedOutView dispatch={dispatch} />
            </Route>
          </Switch>
        }
        {userState.user.id &&

          <UserContext.Provider value={{
            user: userState.user,
            lists: userState.lists,
            selectedTask,
            setSelectedTask,
            dispatch
          }} >
            <Switch>
              <Route path="/home" exact={true}>
                <Main
                  dispatch={dispatch}
                  userState={userState}
                ></Main>
              </Route>
              <Route path="*">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </UserContext.Provider>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
