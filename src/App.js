import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import useToken from './components/useToken';
import './App.css';
import Main from './components/Main';

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {
          !token && token !== "" && token !== undefined ?
            <Login setToken={setToken} /> :
            <Main token={token} />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
