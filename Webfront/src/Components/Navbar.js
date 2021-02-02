import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import axios from 'axios';
import { Modal, Form } from "react-bootstrap";
import{ useState, useEffect } from "react";
import {API_BASE_URL} from '../constants/apiContants';
 import "./UsersList.css";
 import "../slides/Slide.css";
import "./Navbar.css";
import purple from '@material-ui/core/colors/purple';
//import teal from '@material-ui/core/colors/purple';
import {GoSearch} from 'react-icons/go';

//import {FaHome} from 'react-icons/fa';
import {withStyles } from '@material-ui/core/styles';
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
 //import {MdGroup} from 'react-icons/md';
// import UserList from './UsersList';

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

const result = await axios.get(API_BASE_URL+ `/books?search=${user.user}&search-fields=author&search-fields=title`,
 ).then((res)=> {
 setSearch(res.data.results)
 console.log(res);
  
});
}

useEffect(() => {
  axios.get(API_BASE_URL+ `/api/user-profile/' + ${Cookies.get('userId')}`)
  .then(function (response){
    //console.log(response);
    //console.log(response.data);
    Cookies.set('userPic',API_BASE_URL+ response.data.profile_photo);
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

  const routeToGroups = ()=>{
    props.history.push('/groups');
  }
  const routeToQuizes = ()=>{
    props.history.push('/quizes');
  }

  const accent= { backgroundColor: purple[500], color: '#000' }

  const bookSelectedHandler = ( b ) => {
    console.log(b);
    props.history.push( '/book/' + b.id );
  }
  const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #7eccb7 30%, #4a8a96  90%)',
      color: 'black',
      height: 50,
      padding: '0 30px',
      boxShadow: '5px 3px 4px 2px rgba(34, 33, 35, 0.3)',

    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);
  const logout = () =>{
        
    //localStorage.clear("token");
    Cookies.remove('userToken');
    Cookies.remove('userName');
    Cookies.remove('userId');
    props.history.push('/login');
}

    return(   
      <nav class="navbar navbar-expand-lg navbar-light px-5 color4 shadow sticky-top" style={{direction:"rtl"}}>
        <h1 className="mx-1 mb-n1">  
          <GiBookshelf color="white" />
        </h1>
        <b className="mx-1 my-n2 " 
         style = {{fontSize:33,fontWeight:"bold",color:"white"}}
          
        >کیما</b> 
        <button class="navbar-toggler" style={{backgroundColor:"white"}}  type="button " data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon "></span>
        </button>

        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          <ul class="navbar-nav ml-5">
            <li  class="nav-link btn"
               style = {{fontSize:20,fontWeight:"bold",color:"white"}}>
              <a onClick={routeToGroups}>گروه‌ها</a>
            </li>
            <li  class="nav-link btn"
               style = {{fontSize:20,fontWeight:"bold",color:"white"}}>
              <a onClick={routeToQuizes}>آزمونک</a>
            </li>
            <li class="nav-link btn"
               style = {{fontSize:20,fontWeight:"bold",color:"white"}}>
              <a onClick={routeToHome}>خانه</a>
            </li>
          </ul>
          <div className="d-flex flex-grow-1 mx-md-5 ">
              <Button variant="gray" className="mr-md-5" onClick={handleShow}>
                <GoSearch className="" size="30" color="white" />
              </Button>
              <input className="rounded-pill text-right ml-4 ml-md-5 flex-fill my-1"  type="text" name="name" placeholder="   جستجوی کتاب یا نویسنده..." onChange={handleChange}  value={user.user} 
              
               />  
              
          </div>
          <div className="d-flex justify-content-between mr-md-5">
              <div className="btn-group mx-auto dropright" role="group">
                <div type="button" class="btn " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <Avatar alt="" src={Cookies.get('userPic')} className="shadow" />
                </div>
                <div className="dropdown-menu px-1 mx-n2"  aria-labelledby="btnGroupDrop1">
                  <div className="d-flex align-items-end flex-column">
                  <div className="text-left mx-3" style={{fontSize:18,fontFamily:'Yekan'}} >
                  {Cookies.get('userName')}
                  </div>
                  <div class="dropdown-divider"></div>
                  <div className="btn"  onClick={routeToProfile}  style={{fontSize:16,fontFamily:'Yekan'}}>
                    پروفایل
                  </div>
                  <div type="button" className="btn" onClick = {logout} style={{fontSize:16,fontFamily:'Yekan'}} >
                    خروج ازحساب
                  </div>
                 
                  </div>
                </div>
              </div>
          </div>


            <Modal show={show} onHide={handleClose} className="maodal">
        <Modal.Header closeButton>
           <div className="header"style={{fontFamily:"Yekan"}}>
          نتایج
          </div>
        </Modal.Header>
        <Modal.Body>
          {search != 0 ?
          <div>
       {search.map((item) => (
     <div className="out" key={item.id} onClick={() => bookSelectedHandler( item)} >
       <div className="">
         <img
           className="squer img-responsive"
           src={item.imgurl}
         /> 
         </div>
         <div className="bod">
              {item.title.length >20 ?
<Tooltip  title= {<div style={{color: "white",
        fontFamily:"Yekan",
        fontSize:20,
        width:180,
        height:80,
        textAlign:"center",
        marginLeft:-9,
        paddingTop:30,}}>{item.title} </div>}> 
    <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{item.title}</div>
      </Tooltip>
      : <div className="card-title1" style={{fontWeight:"bold",color:"black",fontFamily:"Yekan"}}>{item.title}</div>
      
} 
                <small className= "title">
                   <h5 className="card-title2"style={{fontWeight:"bold",color:"gray",fontFamily:"Yekan"}}>{item.author}</h5>

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
          <Button variant="info" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>

        </div>



      </nav>


      
    );
    }

    export default withRouter( NavBar);
