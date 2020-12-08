import React, { Component } from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {GiBookshelf} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';
import axios from 'axios';
import { Modal, Form } from "react-bootstrap";
import{ useState, useEffect } from "react";
 import "./UsersList.css";
 import "./HelpingNavbar";
import "./Navbar.css";
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/purple';
import {GoSearch} from 'react-icons/go';
// import {MdGroup} from 'react-icons/md';
// import UserList from './UsersList';
import { Route,withRouter } from 'react-router-dom';
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
try {
 setError(null);
const result = await axios.get(`http://127.0.0.1:8000/dyanmicsearch/?search=${user.user}&search_fields=author&search_fields=title`,
 ).then((res)=> {
   if(res.data.count == 0){
     setError(' ): نتیجه‌ای یافت نشد');
   }
   else{
    setSearch(res.data.results);
      }
 
}).catch ((err)=> {console.log(err)});
 

if (search == [null]) {
setSearch([]);
} else {
setSearch(result.data);
}
}
catch (err) {console.log(err)}

};

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
  const accent= { backgroundColor: purple[500], color: '#000' }

    return(   
<Navbar className= "navbarMain navbar navbar-expand color4 flex-column flex-md-row bd-navbar" style={{backgroundColor: teal[500], color: '#000'}}>
            <h1>  
             <GiBookshelf color="black"
            //  style = {{padding:4, height:100,width:40}}
             />
             </h1>
             <b className=""
            
            style = {{fontSize:35,fontFamily: 'Morvarid',fontWeight:"bold",color:"black"}}
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
    <GoSearch size="30" color="black" />
        </Button>
      <Modal show={show} onHide={handleClose} className="maodal">
        <Modal.Header closeButton>
           <div className="header"style={{fontFamily:'Morvarid'}}>
          نتایج
          </div>
        </Modal.Header>
        <Modal.Body>
    <p style={{textAlign:"center",fontFamily:'Morvarid'}}>{error}</p>
       {search.map((item) => (
     <div className="out1" key={item.id}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose} style={{fontFamily:'Morvarid'}}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  
       <a class="nav-item1 row"  onClick={routeToProfile} style={{color:"black",fontFamily:'Morvarid'}} >
       <small className="name" size="50" style={{padding:10,fontSize:20}}>
      {Cookies.get('userName')}
    </small>

    {/* <CgProfile size="40" vertical-align='center' color="black"
    //  style={{fontFamily: 'Roboto',fontWeight:"bold",color:"black"}}
     />  */}
     <Avatar alt="" src={Cookies.get('userPic')} className="mr-2" />
     </a>
  </Navbar.Collapse>
</Navbar>

    );
    }

    export default withRouter( NavBar);