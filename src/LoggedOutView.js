import { Route } from "react-router-dom"
import Login from "./components/Login"

export default function LoggedOutView({ dispatchToken }) {
  return (
    <Route
      exact={true}
      path="*">
      <Login dispatchToken={dispatchToken} />
    </Route>
  )
}
