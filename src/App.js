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
  lists: [],
  tasks: []
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
        ...state,
        lists: action.payload.lists
      }
    case 'tasks':
      return {
        ...state,
        tasks: []
      }
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

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
  // }, [state.user.id])

  return (
    <BrowserRouter>
      <div >
        {
          !state.user.id &&
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <LoggedOutView dispatch={dispatch} />
            </Route>
          </Switch>
        }
        {state.user.id &&

          <UserContext.Provider value={{
            user: state.user,
            lists: state.lists,
            dispatch
          }} >
            <Switch>
              <Route path="/home" exact={true}>
                {/* <Main
                  dispatch={dispatch}
                  state={state}
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
