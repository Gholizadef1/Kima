import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import "./Navbar.css";
import {GoSearch} from 'react-icons/go';
import ReactNavbar from "react-responsive-animate-navbar";
import { NavItem, NavDropdown, MenuIte} from 'react-bootstrap';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
export class NavBar extends Component{
    render(){
    return(
    
<Navbar className= "navbar navbar-expand-lg navbar-dark{color:#ff5500;}">
            <h1>  
             <GiBookshelf style = {{padding:4, height:100,width:40}}/>
             </h1>
             <b class=" text-dark" style = {{fontSize:30}}>Kima</b>     
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link class="nav-link text-dark" href="topics" style = {{fontSize:20, padding:30}}>Topics</Nav.Link>
      <Nav.Link class="nav-link text-dark" href="groups" style = {{fontSize:20, padding:30}}>Groups</Nav.Link>
      <Nav.Link class="nav-link text-dark" href="quize"style = {{fontSize:20, padding:30}} >Quiz</Nav.Link>
    </Nav> 
    <Nav className = "searchbar">  
           <form class = "form-inline">
                   <input class = "form-control mr-lg-2"style={{width:500}} type = "search"
                   placeholder="Search in books..." aria-label= "Search">
                   </input>
                   <button class = "btn btn-dark my-sm-0" type ="submit">
                       <GoSearch/>
                   </button>
               </form>  
               </Nav>
     
       <a class="nav-link text-dark" href="profile"style = {{display: "flex", 
  justifyContent:"space-between",
  alignItems: "center"}} >
    <small size="50">
    user name
    </small>

    <CgProfile size="35" vertical-align='center'/> 
     </a>
    

  </Navbar.Collapse>
</Navbar>
    );
    }
}
