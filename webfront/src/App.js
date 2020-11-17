import React ,{useState}  from 'react';
//import logo from './logo.svg';
import './App.css';
import RegistrationForm from './components/registrationForm/registrationForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import LoginForm from './components/loginForm/loginForm';
import AlertComponent from './components/alertComponent/alertComponent.js';  
//import Home from './components/home/home'; 
import Slide from './slides/Slide';
import {NavBar} from "./Components/Navbar";
//import *as ReactBootstrap from "react-bootstrap";
import BookView from './components/bookView/bookView'
//import loginForm from './components/loginForm/loginForm';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App" >
        
        <div >
          {/* <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/> */}
          <Switch>
            <Route path="/" exact={true}>
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
            {/* <Route path="/book">
              <NavBar/>
              <BookView showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route> */}
            <Route path="/book/:bookId">
              <NavBar/>
              <BookView showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
          </Switch>
        
      </div>
    </div>
    </Router>
  )
  // return (
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

export default App;
