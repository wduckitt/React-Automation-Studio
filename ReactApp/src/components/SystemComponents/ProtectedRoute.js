import React, { useContext } from 'react';
import AutomationStudioContext from './AutomationStudioContext';
import BusyLoggingIn from './BusyLoggingIn';
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const Component = props.component;
  const context = useContext(AutomationStudioContext);
  const loggingIn = context.userData.loggingIn;
  const {appCfg}=context;
  const {enableLogin}=appCfg;
  const loggedIn = context.userData.loggedIn || enableLogin!==true;
  return (

    //  <Route  path={props.path}  render={()=>( 
    //   loggedIn?<Component />:(loggingIn?<BusyLoggingIn/>:<Redirect to="/logIn" />)
    //   )}/>
    <Route path={props.path}  >

      {
        (routeProps) => (
          loggedIn ?
            <Component {...routeProps} /> :
            (loggingIn ?
              <BusyLoggingIn />
              :
              <Redirect
              
                to={{
                  pathname: "/logIn",
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