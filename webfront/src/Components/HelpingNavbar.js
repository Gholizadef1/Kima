import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import "./Navbar.css";
import {GoSearch} from 'react-icons/go';
import {FaHome} from 'react-icons/fa';
import UserList from './UsersList';
import {Card} from 'react-bootstrap';
import "./HelpingNav.css";
//import ReactNavbar from "react-responsive-animate-navbar";
//import { NavItem, NavDropdown, MenuIte} from 'react-bootstrap';
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export class HelpingNavbar extends Component{
  
    render(){
    return(   
      <div class="card">
      <div class="card-header">
<Navbar className= "navbar">
            <h1>  
             <GiBookshelf style = {{padding:4, height:100,width:40}}/>
             </h1>
             <b class=" text-dark" style = {{fontSize:30}}>کیما</b>     
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    </Nav> 
    <UserList/>
             
    <a class="nav-item" href="home" >
      
    <small className="name1" size="60">
      خانه
    </small>
    
<FaHome size="30" color="black"/>

  </a>
 
            
    

  </Navbar.Collapse>
</Navbar>
</div>
</div>
    );
    }
}
export default HelpingNavbar;