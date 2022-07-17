import fetcher from './fetcher';
import { useContext } from 'react';
import { UserContext } from './Main';
function Logout() {
  const { dispatchToken } = useContext(UserContext);
  async function logMeOut(e) {
    e.preventDefault();
    const res = await fetcher("/logout", {
      method: "POST",
    })
    if (res.status >= 200 && res.status < 400) {
      dispatchToken({
        type: "logout", payload: null
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
