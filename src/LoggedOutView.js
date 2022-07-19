import { Redirect, Route } from "react-router-dom"
import Login from "./components/Login"

export default function LoggedOutView({ dispatch }) {
  return (
    <Route
      exact={true}
      path="*">
      {/* <Redirect to='/login' /> */}
      <Login dispatch={dispatch} />
    </Route>
  )
}
