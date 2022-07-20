import { Redirect, Route } from "react-router-dom"
import Login from "./components/Login"
import './LoggedOutView.css'

export default function LoggedOutView({ dispatch }) {
  return (
    <Route
      exact={true}
      path="*">
      <Login dispatch={dispatch} />
    </Route>
  )
}
