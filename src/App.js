import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
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

const initialState = { user: {}, lists: [] };

function userReducer(state, action) {
  switch (action.type) {
    case 'logout':
      return {
        user: {},
        lists: []
      };
    case 'login':
      return {
        user: action.payload.user,
        lists: action.payload.lists
      };
    case 'get':
      return {
        user: action.payload.user,
        lists: action.payload.lists
      }
    default:
      throw new Error();
  }
};

function App() {
  const [userState, dispatch] = useReducer(userReducer, initialState);
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
