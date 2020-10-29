import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import "./Navbar.css";
import * as ReactBootStrap from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

export class NavBar extends Component{
    render(){
    return(
        <nav class="navbar navbar-expand-md navbar-dark bg-info">
            
         <h1>
        <GiBookshelf/>
        </h1>
        <h1 class=" p-1 text-dark" style = {{fontSize:30}}>Kima</h1>
        
        
        <div class="collapse navbar-collapse" id="navbarNav" >
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link text-dark " href="topics">Topics
                    </a>
                    
              </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="groups">Groups</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="quize">Quize</a>
                </li>
            </ul>
            
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link text-dark" href="login">
                        <h1>
                        <CgProfile/>
                        </h1>
                    </a>
                </li>
            </ul>
            
            
        </div>
    </nav>
         );
    }
}
