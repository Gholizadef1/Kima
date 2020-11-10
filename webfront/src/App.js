import React ,{useState}  from 'react';
import './App.css';
import RegistrationForm from './components/registrationForm/registrationForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginForm from './components/loginForm/loginForm';
import AlertComponent from './components/alertComponent/alertComponent.js';  
import Profile from "./Components/Profile"; 
import Slide from './slides/Slide';
import NavBar from "./Components/Navbar";
//import *as ReactBootstrap from "react-bootstrap";

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App" >
        
        <div >
          
          <Switch>
            <Route path="/" exact={true}>
               <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
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
              <Profile/>
            </Route>
          </Switch>
        <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
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
