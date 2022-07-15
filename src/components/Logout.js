function Header({ token }) {

  async function logMeOut(e) {
    e.preventDefault();
    const res = await fetch("/logout", {
      method: "POST",
    })
    if (res.status >= 200 && res.status < 400) {
      console.log('logging out...');
      token();
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
