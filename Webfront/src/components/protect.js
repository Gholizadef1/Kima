import React ,{useState}  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
//  Link,
//  useRouteMatch,
//  useParams,
//  withRouter
} from "react-router-dom";
import Cookies from 'js-cookie';
import NavBar from "../Components/Navbar";


const ProtectedRoute=({ component: Component, ...rest})=>{
  const location = useLocation();
      
      console.log(Cookies.get('userToken'));
      return(
        <Route
        {...rest}>
        {Cookies.get('userToken') !== undefined ?
        <div>
        <NavBar/>
        <Component />
        </div>
        : 
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
        }
      </Route>
    );
  }

  export default ProtectedRoute;