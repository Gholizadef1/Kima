import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
// import {CgProfile} from 'react-icons/cg';
import axios from 'axios';
import { Modal, Form } from "react-bootstrap";
import{ useState, useEffect } from "react";
 import "./UsersList.css";
import "./HelpingNav.css";
import {GoSearch} from 'react-icons/go';
import {FaHome} from 'react-icons/fa';
import {MdGroup} from 'react-icons/md';
import UserList from './UsersList';
import { Route,withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
//import ReactNavbar from "react-responsive-animate-navbar";
//import { NavItem, NavDropdown, MenuIte} from 'react-bootstrap';
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
function NavBar (props){
  const [user,setUser] = useState({user:null});
  const [search,setSearch] = useState([]);
  // const [users,setUsers] = useState([]);
 
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const routeToProfile = ()=>{
    props.history.push('/profile');
  }

    return(   
<Navbar className= "navbarMain navbar navbar-expand color4 flex-column flex-md-row bd-navbar">
            <h1>  
             <GiBookshelf color="black"
            //  style = {{padding:4, height:100,width:40}}
             />
             </h1>
             <b className=""
            
            style = {{fontSize:35,fontFamily:'Morvarid',fontWeight:"bold",color:"black"}}
             >کیما</b>     
  {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
  <Navbar.Collapse id="basic-navbar-nav ">
    <Nav className="mr-auto pt-2">
      <Nav.Link className="nav-link2 h4 ml-3" href="topics"
        style = {{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}
       >عناوین</Nav.Link>
      <Nav.Link className="nav-link2 h4" href="groups"
        style = {{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}
       >گروه‌ها</Nav.Link>
      <Nav.Link className="nav-link2 h4" href="quize"
       style = {{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}
       >آزمونک</Nav.Link>
    </Nav> 
    <>
      {/* <div
        // className="d-flex align-items-center justify-content-center"
        // style={{ height: "100vh" }}
      >
    
      </div> */}
      <input className="inputNavbar col-3 p-1 text-right"type="text" name="name" placeholder="...جستجوی کتاب یا نویسنده" onChange={handleChange}  value={user.user} 
      style={{fontFamily:'Morvarid'}}
      // style={{position:"absolute",left:1000,top:18,textAlign:"right"}}
      />
    <Button variant="gray" onClick={handleShow}>
    <GoSearch size="30" color="black"/>
        </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
           <div className="header"style={{fontFamily:'Morvarid'}}>
          نتایج
          </div>
        </Modal.Header>
        <Modal.Body>
       {search.map((item) => (
     <div className="out1" key={item.id}>
       <div className="card cat1">
         <img
           className="squere1" 
           
           src={item.imgurl}
         /> 
         <small className= "title">
         <h5 className="card-title3"style={{fontFamily:'Morvarid'}}>{item.title}</h5>
         <h5 className="card-title4"style={{fontFamily:'Morvarid'}}>{item.author}</h5>
          </small>
          </div>
       </div>
       ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}style={{fontFamily:'Morvarid'}}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  
       <a class="nav-item1" href="home" >
       <small className="name" size="50"style={{fontFamily:'Morvarid',color:'black'}} >
      خانه
    </small>

    <FaHome size="35" vertical-align='center' style={{fontWeight:"bold",color:"black"}}/> 
     </a>
  </Navbar.Collapse>
</Navbar>
    );
    }

    export default withRouter( NavBar);
