import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import image from "../../assets/5.jpeg";
import images from "../../assets/image.jpeg";
import one from "../../assets/1.jpeg";
import { Modal, Form } from "react-bootstrap";
import two from "../../assets/2.jpeg";
import './Groupepage.css';
import React, { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Cookies from 'js-cookie';

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
  
  function GroupPage (props){
    const [ginfo, setGinfo] = useState([]);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const[message,setMessage]= useState("");
    const [members,setMembers] = useState([]);
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [join,setJoin] = useState(false);
    
  const [newDiscussion,setNewDiscussion] = useState({
    name : "",
    backError : ""
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/group/details/1")
      
      .then((data) => {
         console.log(data);
         console.log(data.data.group_photo);
        setGinfo(data.data);
        console.log(data.data.owner.username);
        if(data.data.owner.username === Cookies.get('userName')){
          setMessage("You are owner!");
        }
        console.log(ginfo.group_photo);
      });
      
  }, []);
  ///////////////////////////////////////////////////////

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/group/members/1`)
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
        setMembers(data);
        console.log(members.profile_photo);
        console.log(data);
        for (var i = 0; i < data.length; i++) {
         
          if(data[i].user.username === Cookies.get('userName')){
            setMessage('You joind this group!');
          }
          if(data[i].user.username != Cookies.get('userName')){
            setMessage('You leaved this group!');
          }
        }
      
      });
  }, [join]);
  const leaveGroup = ()=>{
    axios.post(
      "http://127.0.0.1:8000/api/group/members/1",
    {},
    {
      headers:{
        "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        }).then(data => {
        setJoin(true);
          console.log(data.data.message);
          
        })
    .catch(error=>{
      console.log(error);
    });
    props.history.push('/group');
  }
  const deletGroup =()=>{
    props.history.push('/groups');
  }
  ///////////////////////////////////////////////////////////
  axios.post(
    "http://127.0.0.1:8000/api/group/1/discussion",newDiscussion.name,
  {
    headers:{
      "Content-Type":"application/json",
     "Authorization":"Token "+Cookies.get("userToken")}
      })
  
  /////////////////////////////////////////////////////////
    const joinGroup =()=> { 
      axios.post(
        "http://127.0.0.1:8000/api/group/members/1",
      {},
      {
        headers:{
          "Content-Type":"application/json",
         "Authorization":"Token "+Cookies.get("userToken")}
          }).then(data => {
          setJoin(true);
            console.log(data.data.message);
          })
      .catch(error=>{
        console.log(error);
      });
    }
 /////////////////////////////////////////////////////   
    const handleCloseCreateGroup = () => {
      setOpenCreateGroup(false);
      setNewDiscussion({
        name : "",
        backError : ""
      }); 
    };
    
    const handleChange = (e) => {
      const {id , value} = e.target   
      setNewDiscussion(prevState => ({
          ...prevState,
          [id] : value
      }))
  }
    const handleCreateDiscussionSubmit =(e) =>{
      e.preventDefault();
      setNewDiscussion(prevState => ({
          ...prevState,
          backError : ""
      })); 
    }
    
  const handleClickOpenCreateGroup = () => {
    setOpenCreateGroup(true);
  };


    return(
      
      <div className="mx-md-1 pt-5 px-md-5">
       
      <div className="container-fluid text-center px-md-5 py-md-5" >
        <div className="mx-md-5">
        <div className="no-gutters shadow table-borderless my-5 mx-2 ">
        <img src={image} className="avatar img-responsive"/>
        
        <div class="card cardG">

  <div class="card-body" key={ginfo.id}>
    
    <img src={`http://127.0.0.1:8000${ginfo.group_photo}`} className="imageg img-responsive"></img>
  </div>
    </div>
    <div>
        
    <div className="mt-n5 ml-5">
  
    <b className="title-g" >نام گروه:  {ginfo.title}</b>
    </div>

    {message === "You joind this group!" ?
    <div>
    <button onClick={leaveGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>خارج‌شدن از گروه</button>
    <div className="btn btn-d bg-danger" style={{color:"white"}} onClick={handleClickOpenCreateGroup}>
 بحث جدید
                </div>
                
                <Dialog open={openCreateGroup} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title" style={{direction:"rtl",textAlign:"right"}}>
                  <DialogTitle id="form-dialog-title">ساخت بحث جدید</DialogTitle>
                  <DialogContent >

                  <form >
                    <input
                      autoFocus
                      margin="dense"
                      id="name"
                      style={{fontFamily:"Yekan"}}
                      placeholder="عنوان بحث"
                      type="title"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"

                    />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCreateGroup} color="black">
                    بستن
                    </Button>
                    <Button onClick={handleCreateDiscussionSubmit} color="black">
                      ثبت
                    </Button>
                  </DialogActions>
                </Dialog>
</div>
    :
    <div>       
    </div>
      }
     
      {message === "You leaved this group!"?
      <div>      <button onClick={joinGroup}  className="btn btn-g bg-primary" style={{color:'white'}}>اضافه‌شدن به گروه</button>
      </div>
      :
      <div></div>
    }
    
    {message === "You are owner!" ?
    <div>
    <button onClick={deletGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>حذف گروه</button>
    <div className="btn btn-d bg-danger" style={{color:"white"}} onClick={handleClickOpenCreateGroup}>
 بحث جدید
                </div>
                
                <Dialog open={openCreateGroup} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title" style={{direction:"rtl",textAlign:"right"}}>
                  <DialogTitle id="form-dialog-title">ساخت بحث جدید</DialogTitle>
                  <DialogContent >

                  <form >
                    <input
                      autoFocus
                      margin="dense"
                      id="name"
                      value={newDiscussion.name}
                      style={{fontFamily:"Yekan"}}
                      placeholder="عنوان بحث"
                      type="title"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"

                    />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCreateGroup} color="black">
                    بستن
                    </Button>
                    <Button onClick={handleCreateDiscussionSubmit} color="black">
                      ثبت
                    </Button>
                  </DialogActions>
                </Dialog>
</div>
    :
    <div>       
    </div>
      }
     
   
    

    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:20,position:"relative",marginLeft:560}}>:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}

</p>
  
   
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:20,position:"relative",marginLeft:580}}>بحث‌ها</b>
    <div class="card card-discussion">
  <div class="card-body">
  <p className="text-right">بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بح ث
</p>
  </div>
  
    </div>  
  
   
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:20,top:-230,position:"relative",marginLeft:450}}> ({ginfo.members_count}) اعضا</b>
     {members.map ((current) => (
       <div className="row" key={current.id}>
                <Avatar
                  src={`http://127.0.0.1:8000${current.user.profile_photo}`}
                  style={{
                  fontSize: '80px',
                 width: 70,
                 height: 70}}
                  
                />
                <div> {current.user.username} </div>
              </div>
                
        ))
        }
          </div>
                <div className="more" onClick={handleShow} style={{fontFamily:'Yekan',fontSize:20,top:-170,position:"relative",marginLeft:50}}>...بیش‌تر</div>

            <Modal show={show} onHide={handleClose} className="maodal">
        <Modal.Header closeButton>
           <div className="header"style={{fontFamily:'Yekan'}}>
          نتایج
          </div>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose} style={{fontFamily:'Mitra'}}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>

</div>
</div>

</div>


</div>
    );

  }
  export default withRouter(GroupPage);