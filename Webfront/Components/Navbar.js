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
        <nav class="navbar navbar-expand-md navbar-dark{color:#ff5500;}">
            
         <h1>
             
        <GiBookshelf style = {{padding:4, height:100,width:40}}/>
        </h1>
        <h1 class="text-dark" style = {{fontSize:35}}>Kima</h1>
        
        
        <div class="collapse navbar-collapse" id="navbarNav" >
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link text-dark p-4" href="topics" style = {{fontSize:20}}>Topics
                    </a>
                    
              </li>
                <li class="nav-item">
                    <a class="nav-link text-dark p-4" href="groups" style = {{fontSize:20}}>Groups</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-dark p-4" href="quize"style = {{fontSize:20}} >Quize</a>
                </li>
            </ul>
            <ul class = "searchbar mx-auto">
           

                <form class = "form-inline active-pink ">
                    <input class = "form-control mr-sm-2" type = "search"
                    placeholder="Search Books..." aria-label= "Search">
                    </input>
                    <button class = "btn btn-dark my-sm-0" type ="submit">
                        Search
                    </button>
                </form>
                   
                </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link text-dark" href="profile">
                        <h1 class="p-2">
                        <CgProfile size="3rem" />
                        </h1>
                        <small class=" text-dark">user name</small>
                    </a>
                </li>
            </ul>
    
        </div>
    </nav>
         );
    }
}
