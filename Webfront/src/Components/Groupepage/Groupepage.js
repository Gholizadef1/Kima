import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import {GoHeart} from 'react-icons/go';
import {AiOutlineLike} from 'react-icons/ai';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
    const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
    const[owner,setOwner]= useState("");
    const[joinduser,setJoinduser]= useState("");
    const[user,setUser]= useState("");
    const [member,setMembers] = useState([]);
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [join,setJoin] = useState(false);
  const [showdiscussion,setShowdiscussion]=useState([]);
    
  const [newDiscussion,setNewDiscussion] = useState({
    name : "",
    summary: "",
    backError : ""
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/group/details/3")
      
      .then((data) => {
         console.log(data);
         console.log(data.data.group_photo);
        setGinfo(data.data);
        console.log(data.data.owner.username);
        if(data.data.owner.username === Cookies.get("userName")){
          setOwner('You are owner!');
          console.log("cjd");
          console.log(user);
        }
        console.log(ginfo.group_photo);
      });
      
  }, [join]);
  ///////////////////////////////////////////////////////
  
/////////////////////////////////////////////////////   
  const handleCloseCreateGroup = () => {
    setOpenCreateDiscussion(false);
    setNewDiscussion({
      name : "",
      backError : ""
    }); 
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/group/members/3")
      .then((data) => {
         console.log(data.data.owner.username);
        setMembers(data.data.members);
        
          for(var i =0; i<data.data.members.length ; i++){
            if(data.data.members[i].user.username === Cookies.get("userName")){
              setJoinduser("You joind this group!");
              setUser("");
              console.log("dkjsn");
              console.log(user);
              console.log(owner);
              break;
        }
        console.log(joinduser);
      
        if(data.data.owner.username != Cookies.get("userName") && joinduser != ""){
          setUser("You leaved this group!");
          
          console.log("dkjsn");
        }
        console.log(user);
        console.log(joinduser);
      
    }
 
       
      });
  }, [join]);
  const joinGroup =()=> { 
    axios.post(
      "http://127.0.0.1:8000/api/group/members/3",
    {},
    {
      headers:{
        "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        }).then(data => {
        setJoin(true);
        setUser("You joind this group!");

    
          console.log(data);
         
        })
    .catch(error=>{
      console.log(error);
    });
  }
  const leaveGroup = ()=>{
    axios.post(
      "http://127.0.0.1:8000/api/group/members/3",
    {},
    {
      headers:{
        "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        }).then(data => {
        
          console.log(data.data.message);
          
        })
    .catch(error=>{
      console.log(error);
    });
    props.history.push('/groups');
  }
  const deletGroup =()=>{
    props.history.push('/groups');
  }
  ///////////////////////////////////////////////////////////
  
  // useEffect(() => {
  //   axios.get(
  //     "http://127.0.0.1:8000/api/group/3/discussion",
  //   {
  //     headers:{
  //       "Content-Type":"application/json",}
  //       }).then(data => {
  //         console.log(data);
  //         setShowdiscussion(data);
  //       setJoin(true);
  //         console.log(data.data.message);
  //       })
  // }, []);
  
  /////////////////////////////////////////////////////////
    
    const handleChange = (e) => {
      const {id , value} = e.target   
      setNewDiscussion(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  var formdata = new FormData()
  formdata.append('title',newDiscussion.name)
  formdata.append('summary',newDiscussion.summary)

    const handleCreateDiscussionSubmit =(e) =>{
      axios.post(
        "http://127.0.0.1:8000/api/group/3/discussion",formdata,
      {
        headers:{
          "Content-Type":"application/json",
         "Authorization":"Token "+Cookies.get("userToken")}
          })
      e.preventDefault();
      setNewDiscussion(prevState => ({
          ...prevState,
          backError : ""
      })); 
    }
    
  const handleClickOpenCreateDiscussion = () => {
    setOpenCreateDiscussion(true);
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

    {joinduser === "You joind this group!" ?
    <div>
    <button onClick={leaveGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>خارج‌شدن از گروه</button>
    <div className="btn btn-d bg-danger" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
                
                <Dialog open={openCreateDiscussion} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title" style={{direction:"rtl",textAlign:"right"}}>
                  <DialogTitle id="form-dialog-title">ساخت بحث جدید</DialogTitle>
                  <DialogContent >

                  <form >
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      style={{fontFamily:"Yekan"}}
                      value={newDiscussion.name}
                      placeholder="عنوان بحث"
                      type="title"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"

                    />
                    <TextField
                      autoFocus
                    margin="dense"
                    defaultValue=" "
                      id="description"
                      style={{fontFamily:"Yekan"}}
                      value={newDiscussion.summary}
                      placeholder="دربارهٔ بحث"
                      type="description"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"

                    />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCreateGroup} color="black">
                    انصراف
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
     {user ==="" && joinduser==="" && owner==="" ?
     <div>      <button onClick={joinGroup}  className="btn btn-g bg-primary" style={{color:'white'}}>اضافه‌شدن به گروه</button>
     </div>
     :
     <div>
     </div>
     }
      {user === "You leaved this group!"?
      <div>      <button onClick={joinGroup}  className="btn btn-g bg-primary" style={{color:'white'}}>اضافه‌شدن به گروه</button>
      </div>
      :
      <div>
      </div>
  }
      {user === "You joind this group!" ?
       <div>
       <button onClick={leaveGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>خارج‌شدن از گروه</button>
       <div className="btn btn-d bg-danger" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
    بحث جدید
                   </div>
                   
                   <Dialog open={openCreateDiscussion} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title" style={{direction:"rtl",textAlign:"right"}}>
                     <DialogTitle id="form-dialog-title">ساخت بحث جدید</DialogTitle>
                     <DialogContent >
   
                     <form >
                       <TextField
                         autoFocus
                         margin="dense"
                         id="name"
                         style={{fontFamily:"Yekan"}}
                         value={newDiscussion.name}
                         placeholder="عنوان بحث"
                         type="title"
                         onChange={handleChange}
                         fullWidth
                         variant="outlined"
   
                       />
                       <TextField
                         autoFocus
                       margin="dense"
                         id="description"
                         style={{fontFamily:"Yekan"}}
                         value={newDiscussion.summary}
                         placeholder="دربارهٔ بحث"
                         type="description"
                         onChange={handleChange}
                         fullWidth
                         variant="outlined"
   
                       />
                       </form>
                     </DialogContent>
                     <DialogActions>
                       <Button onClick={handleCloseCreateGroup} color="black">
                       انصراف
                       </Button>
                       <Button onClick={handleCreateDiscussionSubmit} color="black">
                         ثبت
                       </Button>
                     </DialogActions>
                   </Dialog>
   </div>

      :
      <div></div>
      }
    
    
    
    {owner === 'You are owner!' ?
    <div>
    <button onClick={deletGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>حذف گروه</button>
    <div className="btn btn-d bg-danger" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
                
                <Dialog open={openCreateDiscussion} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title" style={{direction:"rtl",textAlign:"right"}}>
                  <DialogTitle id="form-dialog-title">ساخت بحث جدید</DialogTitle>
                  <DialogContent >

                  <form >
                    <TextField
                  autoFocus
                      margin="dense"
                      id="name"
                      value={newDiscussion.name}
                      label="نام گروه"
                      type="title"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"

                    />
                    <TextField
                      margin="dense"
                      id="description"
                      value={newDiscussion.description}
                      label="توضیحات"
                      type="description"
                      onChange={handleChange}
                      fullWidth
                      multiline
                      variant="outlined"

                    />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCreateGroup} color="black">
                    انصراف
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
  <div>
     
       </div>

  </div>
  
    </div>  
  
   
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:20,top:-230,position:"relative",marginLeft:450}}> ({ginfo.members_count}) اعضا</b>
     {member.map ((current) => (
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