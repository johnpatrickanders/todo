import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Lists from './components/Lists';
import LoggedOutView from './LoggedOutView';
import Signup from './components/Signup';
import Login from './components/Login';
import { useReducer, useState, createContext, useEffect } from 'react';
import './App.css'


const initialState = {
  user: {
    id: null
  },
  lists: [],
  tasks: []
};
export const UserContext = createContext({
  user: {},
  lists: [],
  tasks: null,
  value: null,
  selectedTask: null
});

function userReducer(state, action) {
  switch (action.type) {
    case 'logout':
      return initialState
    case 'login':
      return {
        ...state,
        user: { ...action.payload.user },
        lists: action.payload.lists
      };
    case 'lists':
      return {
        user: { ...state.user },
        lists: action.payload.lists,
        tasks: action.payload.tasks ? action.payload.tasks : state.tasks
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

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch('/api/loaduser')
      if (res.ok) {
        const { user, tasklists } = await res.json();
        dispatch({
          type: 'login',
          payload: {
            user,
            lists: tasklists
          }
        })
      }
    }
    loadUser();
    // eslint-disable-next-line
  }, [state.user.id])

  return (
    <BrowserRouter>
      <div >
        {
          !state.user.id &&
          < Switch >
            <Route path="/signup">
              <LoggedOutView componentToPassDown={
                <Signup />
              } />
            </Route>
            <Route path="*">
              <LoggedOutView componentToPassDown={
                <Login dispatch={dispatch} />
              } />
            </Route>
          </Switch>
        }
        {state.user.id &&

          < UserContext.Provider value={{
            user: state.user,
            lists: state.lists,
            dispatch
          }} >
            <Switch>
              <Route path="/home" exact={true}>
                <div
                  className="main">
                  <Header
                    dispatch={dispatch}>
                  </Header>
                  <Lists />
                </div>
              </Route>
              <Route path="*">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </UserContext.Provider>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
