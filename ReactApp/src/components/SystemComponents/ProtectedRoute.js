import React, { useContext } from 'react';
import AutomationStudioContext from './AutomationStudioContext';
import BusyLoggingIn from './BusyLoggingIn';
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const Component = props.component;
  const context = useContext(AutomationStudioContext);
  const loggingIn = context.userData.loggingIn;
  const loggedIn = context.userData.loggedIn || process.env.REACT_APP_EnableLogin !== 'true';
  return (

    //  <Route  path={props.path}  render={()=>( 
    //   loggedIn?<Component />:(loggingIn?<BusyLoggingIn/>:<Redirect to="/logIn" />)
    //   )}/>
    <Route path={props.path} exact={props.exact}  >

      {
        (routeProps) => (
          loggedIn ?
            <Component {...routeProps} /> :
            (loggingIn ?
              <BusyLoggingIn />
              :
              <Redirect
              
                to={{
                  pathname: "/login",
                  state: { from: routeProps.location }
                }}
              />
            )
        )
      }
    </Route>

  )
}
export default ProtectedRoute;