import { Route } from "react-router-dom"
import Login from "./components/Login"
import './LoggedOutView.css'

export default function LoggedOutView({ dispatch, componentToPassDown }) {
  return (
    <Route
      exact={true}
      path="*">
      <div className="container__box">
        <div className="box__diagonal">
          <div className="box__content">
            <div className="box__filler"></div>
          </div>
        </div>
        <div className="box__diagonal">
          <div className="box__content">
            {componentToPassDown}
          </div>
        </div>
        <div className="box__diagonal">
          <div className="box__content">
            <div className="box__filler"></div>
          </div>
        </div>
      </div>
    </Route>
  )
}
