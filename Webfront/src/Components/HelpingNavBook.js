
import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
// import {CgProfile} from 'react-icons/cg';
import axios from 'axios';
import {CgProfile} from 'react-icons/cg';
import { Modal, Form } from "react-bootstrap";
import{ useState, useEffect } from "react";
 import "./UsersList.css";


//import "./HelpingNav.css";


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
  const [error,setError] = useState("");
 const handleChange = event => {
    setUser({ user: event.target.value });
  }

const searchUsers = async () => {

  const result = await axios.get(`http://127.0.0.1:8000/dyanmicsearch/?search=${user.user}&search_fields=author&search_fields=title`,
  ).then((res)=> {
  setSearch(res.data.results);
 });
}
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


             <GiBookshelf color="white"


            //  style = {{padding:4, height:100,width:40}}
             />
             </h1>
             <b className=""

            

            style = {{fontSize:35,fontFamily:'Mitra',fontWeight:"bold",color:"white"}}


             >کیما</b>     
  {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
  <Navbar.Collapse id="basic-navbar-nav ">
    <Nav className="mr-auto pt-2">

      <Nav.Link className="nav-link2 h4" href="groups"
        style = {{fontFamily: 'Mitra',fontSize:25,fontWeight:"bold",color:"white"}}
       >گروه‌ها</Nav.Link>
      <Nav.Link className="nav-link2 h4" href="quize"
       style = {{fontFamily: 'Mitra',fontSize:25,fontWeight:"bold",color:"white"}}

       >آزمونک</Nav.Link>
    </Nav> 
    <>
      {/* <div
        // className="d-flex align-items-center justify-content-center"
        // style={{ height: "100vh" }}
      >
    
      </div> */}
      <input className="rounded-pill col-3 p-1 text-right"type="text" name="name" placeholder="...جستجوی کتاب یا نویسنده" onChange={handleChange}  value={user.user} 

      style={{fontFamily:'Mitra'}}
      // style={{position:"absolute",left:1000,top:18,textAlign:"right"}}
      />
    <Button variant="gray" onClick={handleShow}>
    <GoSearch size="30" color="white"/>
        </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
           <div className="header"style={{fontFamily:'Mitra'}}>

          نتایج
          </div>
        </Modal.Header>
        <Modal.Body>
        {search != 0 ?
          <div>
       {search.map((item) => (
     <div className="out1" key={item.id}>
       <div className="card cat1">
         <img
           className="squere1" 
           
           src={item.imgurl}
         /> 
         <small className= "title">


         <h5 className="card-title3"style={{fontFamily:'Mitra'}}>{item.title}</h5>
         <h5 className="card-title4"style={{fontFamily:'Mitra'}}>{item.author}</h5>


          </small>
          </div>
       </div>
       ))}
       </div>
       :
       <div className="not found text-center"> ): نتیجه‌ای یافت نشد</div>
}

        </Modal.Body>
        <Modal.Footer>


          <Button variant="info" onClick={handleClose}style={{fontFamily:'Mitra'}}>


            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  
       <a class="nav-item1" href="home" >

       <small className="name" style={{fontFamily:'Mitra',color:'white',margin:15,fontSize:20}} >
      خانه
    </small>

    <FaHome size="40" vertical-align='center' style={{fontWeight:"bold",color:"white"}}/> 
     </a>
     <a class="nav-item1"  onClick={routeToProfile} style={{color:"white",fontFamily:'Morvarid'}} >

       <small className="name" size="50" style={{padding:10,fontSize:20}}>
      {Cookies.get('userName')}
    </small>



    <CgProfile size="40" vertical-align='center' color="white"


    //  style={{fontFamily: 'Roboto',fontWeight:"bold",color:"black"}}
     /> 
     </a>
  </Navbar.Collapse>
</Navbar>
    );
    }

    export default withRouter( NavBar);

    