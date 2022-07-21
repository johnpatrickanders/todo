import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Lists from './components/Lists';
import LoggedOutView from './LoggedOutView';
import Signup from './components/Signup';
import { useReducer, useState, createContext, useEffect } from 'react';
import './App.css'

export const UserContext = createContext({
  user: {},
  lists: [],
  tasks: null,
  value: null,
  selectedTask: null
});

const initialState = {
  user: {
    id: null
  },
  lists: []
};

function userReducer(state, action) {
  switch (action.type) {
    case 'logout':
      return {
        user: {
          id: null
        },
        lists: []
      }
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
    case 'lists':
      return {
        user: state.user,
        lists: action.payload.lists
      }
    default:
      throw new Error();
  }
};

function App() {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const [selectedTask, setSelectedTask] = useState(null);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const res = await fetch('/loaduser')
  //     if (res.ok) {
  //       const { user, tasklists } = await res.json()
  //       dispatch({
  //         type: 'get',
  //         payload: {
  //           user: user,
  //           lists: tasklists
  //         }
  //       })
  //     }
  //   }
  //   loadUser();
  //   // eslint-disable-next-line
  // }, [userState.user.id])

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
                {/* <Main
                  dispatch={dispatch}
                  userState={userState}
                ></Main> */}
                <div
                  className="main">
                  <Header
                    dispatch={dispatch}>
                  </Header>
                  <Lists
                  ></Lists>
                </div>
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
