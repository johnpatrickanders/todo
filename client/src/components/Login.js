import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../LoggedOutView.css'

function Login({ dispatch }) {
  const history = useHistory();
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })

  async function logMeIn(event) {
    event.preventDefault();
    const XSRFTOKEN = await fetch('/get_csrf');
    const token = await XSRFTOKEN.json()
    const res = await fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token.csrfT
      },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password
      }),
    });
    if (res.status >= 200 && res.status < 400) {
      const { user, tasklists } = await res.json();
      dispatch({
        type: "login",
        payload: {
          user: { ...user },
          lists: tasklists
        }
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

  const popDemoUser = e => {
    e.preventDefault();
    setloginForm({
      email: "testing@example.com",
      password: "test"
    })
  }

  return (
    <div className='form'>
      <h1>Login</h1>
      <form>
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
      <Link
        to="/signup">
        Sign Up
      </Link>
      <Link onClick={(e) => popDemoUser(e)} to="login">
        Set Demo User
      </Link>
    </div>
  );
}

export default Login;
