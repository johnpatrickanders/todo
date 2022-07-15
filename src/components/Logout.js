import removeToken from './useToken';
import fetcher from './fetcher';
function Header() {

  async function logMeOut(e) {
    e.preventDefault();
    const res = await fetcher("/logout", {
      method: "POST",
    })
    if (res.status >= 200 && res.status < 400) {
      console.log('logging out...');
      removeToken();
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

export default Header;
