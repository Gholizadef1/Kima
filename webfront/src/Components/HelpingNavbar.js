import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';

import {GoSearch} from 'react-icons/go';
import {FaHome} from 'react-icons/fa';
import UserList from './UsersList';
import {Card} from 'react-bootstrap';
import "./HelpingNav.css";
import UsersList from './UsersList';
//import ReactNavbar from "react-responsive-animate-navbar";
//import { NavItem, NavDropdown, MenuIte} from 'react-bootstrap';
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export class HelpingNavbar extends Component{
  
    render(){
    return(   
   
<Navbar className= "navbar1">
            <h1>  
             <GiBookshelf style = {{padding:4, height:100,width:40}}/>
             </h1>
             <b class=" text-dark" style = {{fontSize:30}}>کیما</b>   
             <UsersList/>  
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  
             
   
    <small class="name3" size="70">
      خانه
    </small>
    <a className="icon" href="home">
<FaHome size="30" color="black" vertical-align='center' style={{left:-500,position:"absolute",top:-15}} />
</a>
   


  </Navbar.Collapse>
</Navbar>

    );
    }
}

