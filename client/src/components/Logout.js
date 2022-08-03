import { useContext } from 'react';
import { UserContext } from '../App';
function Logout() {
  const { dispatch } = useContext(UserContext);

  async function logMeOut(e) {
    e.preventDefault();
    const res = await fetch("/logout", {
      method: "POST",
    })
    if (res.status >= 200 && res.status < 400) {
      dispatch({
        type: "logout"
      });
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
