import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import "./Navbar.css";
import {GoSearch} from 'react-icons/go';
import {MdGroup} from 'react-icons/md';

import UserList from './UsersList';
//import ReactNavbar from "react-responsive-animate-navbar";
//import { NavItem, NavDropdown, MenuIte} from 'react-bootstrap';
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export class NavBar extends Component{
  
    render(){
    return(   

<Navbar className= "navbar">
            <h1>  
             <GiBookshelf style = {{padding:4, height:100,width:40}}/>
             </h1>
             <b class=" text-dark" style = {{fontSize:30}}>کیما</b>     
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    
      <Nav.Link class="nav-link" href="topics" style = {{padding:30}}>عناوین</Nav.Link>
      <Nav.Link class="nav-link" href="groups" style = {{padding:30}}>گروه‌ها</Nav.Link>
      <Nav.Link class="nav-link" href="quize"style = {{padding:30}} >آزمونک</Nav.Link>
      
    </Nav> 
    
             
    <a class="nav-item" href="search" >
    <small className="name1" size="60">
      جستجو
    </small>
<GoSearch size="30" color="black"/>
  </a>
            
       <a class="nav-item1" href="profile" >
    <small className="name" size="50">
      نام کاربری

    </small>

    <CgProfile size="35" vertical-align='center' color="black"/> 
     </a>
    

  </Navbar.Collapse>
</Navbar>
    );
    }
}
