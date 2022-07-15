function Header(props) {

  function logMeOut() {
    fetch("/logout", {
      method: "POST",
    })
      .then((response) => {
        props.token()
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  return (
    <button onClick={logMeOut}>
      Logout
    </button>
  )
}

export default Header;
