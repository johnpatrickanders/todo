import { useState } from 'react';

function Login(props) {

  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })

  async function logMeIn(event) {
    const res = await fetch("/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password
      })
    })
    if (res.status >= 200 && res.status < 400) {
      console.log(props.data)
      props.setToken(res.data.access_token)
    } else {
      console.log(res.status)
    }

    setloginForm(({
      email: "",
      password: ""
    }))

    event.preventDefault()
  }

  function handleChange(event) {
    const { value, name } = event.target
    setloginForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
  }

  return (
    <div>
      <h1>Login</h1>
      <form className="login">
        <input onChange={handleChange}
          type="email"
          text={loginForm.email}
          name="email"
          placeholder="Email"
          value={loginForm.email} />
        <input onChange={handleChange}
          type="password"
          text={loginForm.password}
          name="password"
          placeholder="Password"
          value={loginForm.password} />

        <button onClick={logMeIn}>Submit</button>
      </form>
    </div>
  );
}

export default Login;
