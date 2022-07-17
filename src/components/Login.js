import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ dispatchToken }) {
  const history = useHistory();
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })

  async function logMeIn(event) {
    event.preventDefault()
    const res = await fetch("/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password
      })
    })
    if (res.status >= 200 && res.status < 400) {
      const data = await res.json();
      console.log(data);
      dispatchToken({
        type: "login",
        payload: data.access_token
      });
    } else {
      console.log(res.status)
    }

    setloginForm(({
      email: "",
      password: ""
    }))
    history.push('/home');
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
