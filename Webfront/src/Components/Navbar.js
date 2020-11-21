import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import axios from 'axios';
import{ useState, useEffect } from "react";
import Horizontal from 'react-scroll-horizontal';
 import "./UsersList.css";
 import "./HelpingNavbar";
import "./Navbar.css";
import {GoSearch} from 'react-icons/go';
import {MdGroup} from 'react-icons/md';
import UserList from './UsersList';
//import ReactNavbar from "react-responsive-animate-navbar";
//import { NavItem, NavDropdown, MenuIte} from 'react-bootstrap';
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
function NavBar (){
  const [user,setUser] = useState({user:null});
  const [search,setSearch] = useState([]);
  const [users,setUsers] = useState([]);
 
 const handleChange = event => {
    setUser({ user: event.target.value });
  }

const searchUsers = async () => {
try {
const result = await axios.get(`http://127.0.0.1:8000/dyanmicsearch/?search=${user.user}&search_fields=author&search_fields=title`,
 ).then((res)=> {
 setSearch(res.data.results)
  
});
if (search == [null]) {
setSearch([]);
} else {
setSearch(result.data);
}
}
catch (err) {}
};

useEffect(() => {
  searchUsers();
  }, [user]);

    return(   

<Navbar className= "navbar">
            <h1>  
             <GiBookshelf style = {{padding:4, height:100,width:40}}/>
             </h1>
             <b class=" text-dark" style = {{fontSize:30}}>کیما</b>     
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    
      <Nav.Link class="nav-link" href="topics" style = {{padding:40}}>عناوین</Nav.Link>
      <Nav.Link class="nav-link" href="groups" style = {{padding:40}}>گروه‌ها</Nav.Link>
      <Nav.Link class="nav-link" href="quize"style = {{padding:40}} >آزمونک</Nav.Link>
    </Nav> 
    <div class="container"> 
    <input type="text" name="name" placeholder="...جستجوی کتاب یانویسنده" onChange={handleChange}  value={user.user} style={{position:"absolute",left:1000,top:18,textAlign:"right"}}/>
    <div class="row">
    
      <div class="col-md-12">
        
        <div class="modal fade" id="myModal">
            
          
            <div class="modal-header">
            <button type="Close" class="btn btn-primary" data-dismiss="model">CLose</button>
              </div>
              <div class="modal-body">
       {search.map((item) => (
     <div className="out1" key={item.id}>
       <div className="card cat1">
         <img
           className="squere1" 
           
           src={item.imgurl}
         /> 
         <small className= "title">
         <h5 className="card-title3">{item.title}</h5>
         <h5 className="card-title4">{item.author}</h5>
          </small>
          </div>
       </div>
       ))}
    
    </div>
              
  </div>
  </div>
  </div>
  </div>
  
 
  
  
  <a class="nav-item" href="search" data-Toggle="modal" data-target="#myModal" >
    <small className="name1" size="60" >
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

export default NavBar;