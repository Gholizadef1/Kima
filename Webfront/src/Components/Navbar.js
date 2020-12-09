import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import axios from 'axios';
import { Modal, Form } from "react-bootstrap";
import{ useState, useEffect } from "react";
 import "./UsersList.css";
// import "./HelpingNavbar";
import "./Navbar.css";
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/purple';
import {GoSearch} from 'react-icons/go';
import {FaHome} from 'react-icons/fa';
// import {MdGroup} from 'react-icons/md';
// import UserList from './UsersList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import Cookies from 'js-cookie';
import Avatar from '@material-ui/core/Avatar';
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
     setSearch(res.data.results)
      
    });
    }



useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/user-profile/' + Cookies.get('userId'))
  .then(function (response){
    //console.log(response);
    //console.log(response.data);
    Cookies.set('userPic',"http://127.0.0.1:8000"+response.data.profile_photo);
      //console.log(user);
  })
  .catch(function (error) {
      console.log(error);
      
  });

  searchUsers();
  }, [user]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const routeToProfile = ()=>{
    props.history.push('/profile');
  }

  const routeToHome = ()=>{
    props.history.push('/home');
  }

  const accent= { backgroundColor: purple[500], color: '#000' }

  const bookSelectedHandler = ( b ) => {
    console.log(b);
    props.history.push( '/book/' + b.id );
  }

    return(   
      <nav class="navbar navbar-expand-lg navbar-light color4">
        <h1>  
          <GiBookshelf color="black" />
        </h1>
        <b className="btn" 
         style = {{fontSize:35,fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}
          onClick={routeToHome}
        >کیما</b> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ">
            <li class="nav-item" href="groups"
               style = {{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}>
              <a class="nav-link" href="#">گروه‌ها</a>
            </li>
            <li class="nav-item" href="quize"
               style = {{fontFamily: 'Morvarid',fontSize:25,fontWeight:"bold",color:"black"}}>
              <a class="nav-link" href="#">آزمونک</a>
            </li>
          </ul>
          <div className="mr-3 d-flex ml-auto justify-content-between ">
            <div>
              <input className="rounded-pill text-right" type="text" name="name" placeholder="...جستجوی کتاب یا نویسنده" onChange={handleChange}  value={user.user} 
               style={{fontFamily:'Morvarid'}}
               />             
                <Button variant="gray" className="" onClick={handleShow}>
                  <GoSearch size="30" color="black" />
                </Button>
                </div>
              <a className="row mt-1"  onClick={routeToProfile} style={{color:"black",fontFamily:'Morvarid'}} >
               <small className="" size="50" style={{padding:10,fontSize:20}}>
                {Cookies.get('userName')}
               </small>
                <Avatar alt="" src={Cookies.get('userPic')} className="" />
              </a>
          </div>


            <Modal show={show} onHide={handleClose} className="maodal">
        <Modal.Header closeButton>
           <div className="header"style={{fontFamily:'Morvarid'}}>
          نتایج
          </div>
        </Modal.Header>
        <Modal.Body>
           {search != 0 ?
          <div>
      
      
       {search.map((item) => (
     <div className="out1" key={item.id} onClick={() => bookSelectedHandler( item)} >
       <div className="card cat1">
         <img
           className="squere1"
           src={item.imgurl}
         /> 
         <small className= "title">
         <h5 className="card-title3" style={{fontFamily:'Morvarid'}}>{item.title}</h5>
         <h5 className="card-title4" style={{fontFamily:'Morvarid'}}>{item.author}</h5>
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
          <Button variant="info" onClick={handleClose} style={{fontFamily:'Morvarid'}}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>

          
        </div>



      </nav>


      
    );
    }

    export default withRouter( NavBar);



