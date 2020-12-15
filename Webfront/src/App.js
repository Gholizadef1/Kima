import React ,{useState}  from 'react';
import './App.css';
import RegistrationForm from './components/registrationForm/registrationForm';
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
import HelpingNavBook from "./Components/HelpingNavBook";
import Scroll from "./Components/Scroll";
import Tabs from "./Tabs/Tabs";
import LoginForm from './components/loginForm/loginForm';
import AlertComponent from './components/alertComponent/alertComponent.js';  
import Avatar from "./Components/Avatar";
import Profile from "./Components/Profile"; 
import Slide from './slides/Slide';
import HelpingNavbar from"./Components/HelpingNavbar";
import UsersList from "./Components/UsersList";
import NavBar from "./Components/Navbar";
//import *as ReactBootstrap from "react-bootstrap";
import BookView from './components/bookView/bookView'
//import loginForm from './components/loginForm/loginForm';
//import {withCookies, Cookies , useCookies} from "react-cookie";
import Cookies from 'js-cookie'
import { render } from '@testing-library/react';
import { components } from 'react-select';
//import protectedRoute from './components/protect';

function App(props) {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  //const [auth,setAuth] = useState(false);
  //const [cookies, setCookie ] =useCookies({token:""});

  // const onChange = (newName)  => {
  //   setCookie('name', newName, { path: '/' });
  // }
  return (
    <Router>
      <div className="App" >
        
        <div >
          {/* <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/> */}
          <Switch>
            <Route path="/" exact={true}>
              {/* <NavBar/>
               <Slide showError={updateErrorMessage} updateTitle={updateTitle}/> */}
               <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/register">
               <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>

            <Route path="/home">
               <NavBar/>
               <Slide/>
            </Route>

           
            <Route path="/profile">
              <HelpingNavbar/>
              <Profile/>
              
              </Route>
            
            <Route path="/book/:bookId">
              <HelpingNavBook/>
              <BookView showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="*">
              <div class="alert alert-warning" role="alert">
                صفحه وجود ندارد
              </div>
            </Route>
          </Switch>
        
      </div>
    </div>
    </Router>
  );
  
function protectedRoute({ children, ...rest}){
   let auth=false;
  // if(Cookies.get('userToken')==undefined){
  //   auth=true;}
  //   else {auth=false;}
    
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
  //</Router>return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}


// = ()=>{
//   console.log(Cookies.get('userToken'));
//   return(
//     // <Route
//     // render={()=>(
//     //   <Component/> 
//     // )}
//     // />
//     <Route
//     render={()=>
//     Cookies.get('userToken')==undefined?(
//       <Redirect to={{path:"/login"}}/>
//     ):(
//       <Route/>
//     )
//     }
//     />

//   )


// }

export default App;
