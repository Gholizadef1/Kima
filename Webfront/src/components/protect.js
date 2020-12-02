import React ,{useState}  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
//  Link,
//  useRouteMatch,
//  useParams,
//  withRouter
} from "react-router-dom";
import Cookies from 'js-cookie'


function protectedRoute({ children, ...rest}){
    let auth;
    console.log(Cookies.get('userToken'));
    console.log(auth);
    if(Cookies.get('userToken')==undefined){
      auth=true;}
      else {auth=false;}
      
      console.log(Cookies.get('userToken'));
      return(
        <Route
        {...rest}
        
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default protectedRoute;