import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import "./Navbar.css";

import {GoSearch} from 'react-icons/go';
import * as ReactBootStrap from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

export class NavBar extends Component{
    render(){
    return(
        <nav class="navbar navbar-expand-lg navbar-dark{color:#ff5500;}">
            
         <h1>
             
        <GiBookshelf style = {{padding:4, height:100,width:40}}/>
        </h1>
        <b class=" text-dark" style = {{fontSize:30}}>Kima</b>
        
        
        <div class="collapse navbar-collapse" id="navbarNav" >
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link text-dark" href="topics" style = {{fontSize:28, padding:30}}>Topics
                    </a>
                    
              </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="groups" style = {{fontSize:28, padding:30}}>Groups</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark" href="quize"style = {{fontSize:28, padding:30}} >Quiz</a>
                </li>
            </ul>
            <ul class = "searchbar mx-auto">
           

                <form class = "form-inline active-pink ">
                    <input class = "form-control mr-sm-2" type = "search"
                    placeholder="Searching books..." aria-label= "Search">
                    </input>
                    <button class = "btn btn-dark my-sm-0" type ="submit">
                        <GoSearch/>
                    </button>
                </form>
                   
                </ul>
            <ul class="navbar-nav">
            <li class="nav-item">
  
 <a class="nav-link text-dark" href="profile"style = {{display: "flex", 
  justifyContent:"space-between",
  alignItems: "center"}} >
    <small size="50">
    user name
    </small>

    <CgProfile size="35" vertical-align='center'/> 


                    </a>
                </li>
                
</ul>
    
        </div>
    </nav>
         );
    }
}
