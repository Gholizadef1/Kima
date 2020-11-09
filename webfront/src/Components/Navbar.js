import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import "./Navbar.css";
import {GoSearch} from 'react-icons/go';
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
    <Nav className = "searchbar">  
           <form class = "form-inline">
                   <input class = "form-control"style={{width:500,fontSize:20}} type = "search"
                   placeholder="...جستجو">
                   </input>
                   <button class = "btn btn-dark" type ="submit">
                       <GoSearch size="30"/>
                   </button>
               </form>  
               </Nav>
     
       <a class="nav-item" href="profile" >
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
