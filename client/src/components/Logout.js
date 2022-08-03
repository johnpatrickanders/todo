import { useContext } from 'react';
import { UserContext } from '../App';
import { useHistory } from 'react-router-dom';
function Logout() {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  async function logMeOut(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "POST",
    })
    if (res.status >= 200 && res.status < 400) {
      dispatch({
        type: "logout"
      });
      history.push('/login');
    } else {
      console.log(res.status);
    }
  }

  return (
    <button onClick={e => logMeOut(e)}>
      Logout
    </button>
  )
}

export default Logout;
