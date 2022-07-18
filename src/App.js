import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import localToken from './localToken';
import Main from './components/Main';
import { useReducer, useState, createContext } from 'react';

export const UserContext = createContext({
  user: {},
  lists: [],
  tasks: null,
  value: null,
  selectedTask: null
});

const initialState = { token: null };

function tokenReducer(state, action) {
  const { saveToken, removeToken, getToken } = localToken;
  switch (action.type) {
    case 'logout':
      removeToken()
      return { token: null };
    case 'login':
      const newToken = saveToken(action.payload.token);
      return {
        token: newToken,
        user: action.payload.user
      };
    case 'get':
      return { token: getToken() }
    default:
      throw new Error();
  }
};

function App() {
  // const [user, setUser] = useState({})
  const [userState, dispatch] = useReducer(tokenReducer, initialState);

  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <BrowserRouter>
      <div >
        {
          // !(userState.token && userState.token !== "" && userState.token !== undefined) ?
          !userState.token && (<Route exact={true} path="*">
            <Login dispatch={dispatch} />
          </Route>)}
        {/* // : */}
        {userState.token &&
          <UserContext.Provider value={{ user: userState.user, lists, selectedTask, setSelectedTask, dispatch }} >
            <Route path="/home" exact={true}>
              <Main
                dispatch={dispatch}
                token={userState.token}
              ></Main>
            </Route>
          </UserContext.Provider>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
