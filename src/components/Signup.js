import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup() {
  const history = useHistory();
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({})

  async function signMeUp(event) {
    event.preventDefault();
    validateInput();
    console.log(errors)
    if (errors) {
      return;
    }
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signupForm.email,
        password: signupForm.password,
        confirmPassword: signupForm.confirmPassword
      })
    })
    if (res.status >= 200 && res.status < 400) {
      const { token, user, tasklists } = await res.json();
    } else {
      console.log(res.status)
    }

    setSignupForm(({
      email: "",
      password: "",
      confirmPassword: ""
    }))
    history.push('/login');
  }

  function handleChange(e) {
    const { value, name } = e.target;
    const fixDelayValue = value;
    setSignupForm(prevNote => ({
      ...prevNote, [name]: value
    }))
    console.log(name, value)
  }
  const validateInput = () => {
    const validationState = { ...errors };
    console.log(signupForm.password, signupForm.confirmPassword)
    if (!signupForm.email) {
      validationState.email = "Please enter email."
    }
    if (!signupForm.password) {
      validationState.password = "Please enter password."
    }
    if (signupForm.password !== signupForm.confirmPassword || !signupForm.confirmPassword) {
      validationState.confirmPassword = "Password and Confirm Password does not match.";
    } else {
      validationState.confirmPassword = "";
    }
    setErrors(validationState);

    return validationState;
  };

  return (
    <>
      <div>
        <h1>Signup</h1>
        <form className="signup">
          <input onChange={handleChange}
            type="email"
            text={signupForm.email}
            name="email"
            placeholder="Email"
            value={signupForm.email} />
          <input onChange={handleChange}
            type="password"
            text={signupForm.password}
            name="password"
            placeholder="Password"
            value={signupForm.password} />
          <input onChange={handleChange}
            type="password"
            text={signupForm.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signupForm.confirmPassword} />
          <button onClick={signMeUp}>Submit</button>
        </form>
      </div>
      {
        Object.values(errors).map(msg =>
          <p key={msg} className='error'>{msg}</p>
        )
      }
    </>
  );
}

export default Signup;
