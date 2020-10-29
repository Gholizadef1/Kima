import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
//import { BrowserRouter, Route } from 'react-router-dom';
import *as ReactBootstrap from "react-bootstrap";
//import BrowserRouter from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
//import { IconName } from "react-icons/gi";
import Slide from './slides/Slide';
import {NavBar} from "./Components/Navbar";

//import Header from "./images/image";
//import {pricing} from "./Components/Pricing";
//import {Navigation} from "./Components/Navigation";
class App extends Component {
  render(){
  return (
      <BrowserRouter>
      <div className = "App">
      
      <NavBar/>
    
 
  <Slide/>


<Switch>
  <Route path = '/' component = {NavBar} exact/>
 
</Switch>
        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;