import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import image from "../../assets/5.jpeg";
import { Modal, Form } from "react-bootstrap";
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

    console.log(props)

    const [ginfo, setGinfo] = useState([]);
    const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
    const[owner,setOwner]= useState("");
    const[joinduser,setJoinduser]= useState("");
    const[user,setUser]= useState("");
    const[summary,setSummary]=useState({user:null});
    const [member,setMembers] = useState([]);
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [join,setJoin] = useState(false);
  const [showdiscussion,setShowdiscussion]=useState([]);
  let { groupId } = useParams();
  const [newDiscussion,setNewDiscussion] = useState({
    name : "",
    description: ""
  });


  useEffect(() => {
    console.log(props.match.params.groupId)
    if (props.match.params.groupId) {

    axios.get("http://127.0.0.1:8000/api/group/details/" + props.match.params.groupId)
      
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
      
  }}, [join,props.match.params.groupId]);
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
    axios.get("http://127.0.0.1:8000/api/group/members/" + props.match.params.groupId)
      .then((data) => {
         console.log(data.data.members);
        setMembers(data.data.members);
        
          for(var i =0; i<data.data.members.length ; i++){
            if(data.data.members[i].user.username === Cookies.get("userName") && data.data.owner.username != Cookies.get("userName")){
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
  }, [join,props.match.params.groupId]);
  const joinGroup =()=> { 
    axios.post(
      "http://127.0.0.1:8000/api/group/members/" + props.match.params.groupId,
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
      "http://127.0.0.1:8000/api/group/members/" + props.match.params.groupId,
    {},
    {
      headers:{
        "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        }).then(data => {
        
          console.log(data.data);
          
        })
    .catch(error=>{
      console.log(error);
    });
    props.history.push('/groups');
  }
  const deletGroup =()=>{
    axios.delete(
      "http://127.0.0.1:8000/api/group/details/" + props.match.params.groupId,
    
    {
      headers:{
        "Content-Type":"application/json",
       "Authorization":"Token "+Cookies.get("userToken")}
        }).then(data => {
          console.log(Cookies.get("userToken"));
          console.log(data);
          props.history.push('/groups');
          
        })
    
  }
  ///////////////////////////////////////////////////////////
  

  
  /////////////////////////////////////////////////////////
    
    const handleChange = (e) => {
      const {id , value} = e.target   
      setNewDiscussion(prevState => ({
          ...prevState,
          [id] : value
      }))
  }
 
    const payloadtitle={
      "title":newDiscussion.name,"description":newDiscussion.description
    }

    //console.log(payloadsummary);
    console.log(payloadtitle);
    const backtitle= JSON.stringify(payloadtitle);
    //const backsummary = JSON.stringify(payloadsummary);
    console.log(backtitle);
    //console.log(backsummary);
    const handleCreateDiscussionSubmit =(e) =>{
      axios.post(
        "http://127.0.0.1:8000/api/group/"+ props.match.params.groupId+"/discussion",backtitle,
      {
        headers:{
          "Content-Type":"application/json",
         "Authorization":"Token "+Cookies.get("userToken")}
          }).then(data =>{
          setJoin(true)
          })
    }
    useEffect(() => {
      axios.get(
        "http://127.0.0.1:8000/api/group/" + props.match.params.groupId+"/discussion",
      {
        headers:{
          "Content-Type":"application/json",
      }
          }).then(data => {
            console.log(data.data.discussions);
            setShowdiscussion(data.data.discussions);
          setJoin(true);
          })
    }, [join,props.match.params.groupId]);
    
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
        
    <div className="mt-n5">
  
    <b className="name">نام گروه:  {ginfo.title}</b>
    </div>

    {joinduser === "You joind this group!" ?
    <div className="group-info">
    <button onClick={leaveGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>خارج‌شدن از گروه</button>
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25}}>:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<div className="btn btn-d bg-danger ml-4" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
  <b className="title-d" style={{fontFamily:'Yekan',fontSize:25}}>بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:100}}>بحثی برای نمایش وجود ندارد</div>

       ) : (
         <div>
        {showdiscussion.map((current) => (
       
          <ul class="list-group text-right">
            
          <li class="list-group-item py-1">
          <div className="text-left">
                <small className="creator">
                {current.creator.username}
                :سازنده
                
                </small>
                <div className="text-right name-d" >
            <h6 className="pt-n3" style={{fontFamily:"Yekan",fontSize:19}}>{current.title}</h6>
            </div>
              </div>
              
            <small className="description" style={{fontFamily:"Yekan",fontSize:15}}>
                 {current.description}
                </small>
                
          </li>
        </ul>
      
        ))}
        </div>
        
       )}
       
  <div>
    </div>
     
       </div>


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
                         
                       margin="dense"
                         id="description"
                         style={{fontFamily:"Yekan"}}
                         value={newDiscussion.description}
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
     {user ==="" && joinduser==="" && owner==="" ?
     <div className="group-info">      
       <button onClick={joinGroup}  className="btn btn-g bg-primary" style={{color:'white'}}>اضافه‌شدن به گروه</button>
       <b className="title-g" style={{fontFamily:'Yekan',fontSize:25}}>:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<div className="btn btn-d bg-danger ml-4" style={{color:"white"}}>
 بحث جدید
                </div>
  <b className="title-d" style={{fontFamily:'Yekan',fontSize:25}}>بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:100}}>بحثی برای نمایش وجود ندارد</div>

       ) : (
         <div>
        {showdiscussion.map((current) => (
       
          <ul class="list-group text-right">
            
          <li class="list-group-item py-1">
          <div className="text-left">
                <small className="creator">
                {current.creator.username}
                :سازنده
                
                </small>
                <div className="text-right name-d" >
            <h6 className="pt-n3" style={{fontFamily:"Yekan",fontSize:19}}>{current.title}</h6>
            </div>
              </div>
              
            <small className="description" style={{fontFamily:"Yekan",fontSize:15}}>
                 {current.description}
                </small>
                
          </li>
        </ul>
      
        ))}
        </div>
        
       )}
       
  <div>
    </div>
     
       </div>
</div>
                       
   </div>

      :
      <div></div>
      }
      {user === "You leaved this group!"?
      <div className="group-info">      
        <button onClick={joinGroup}  className="btn btn-g bg-primary" style={{color:'white'}}>اضافه‌شدن به گروه</button>
        <b className="title-g" style={{fontFamily:'Yekan',fontSize:25}}>:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<div className="btn btn-d bg-danger ml-4" style={{color:"white"}}>
 بحث جدید
                </div>
  <b className="title-d" style={{fontFamily:'Yekan',fontSize:25}}>بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:100}}>بحثی برای نمایش وجود ندارد</div>

       ) : (
         <div>
        {showdiscussion.map((current) => (
       
          <ul class="list-group text-right">
            
          <li class="list-group-item py-1">
          <div className="text-left">
                <small className="creator">
                {current.creator.username}
                :سازنده
                
                </small>
                <div className="text-right name-d" >
            <h6 className="pt-n3" style={{fontFamily:"Yekan",fontSize:19}}>{current.title}</h6>
            </div>
              </div>
              
            <small className="description" style={{fontFamily:"Yekan",fontSize:15}}>
                 {current.description}
                </small>
                
          </li>
        </ul>
      
        ))}
        </div>
        
       )}
       
  <div>
    </div>
     
       </div>


    </div>  
                     
                    
   </div>

      :
      <div></div>
      }
      {user === "You joind this group!" ?
       <div className="group-info">
       <button onClick={leaveGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>خارج‌شدن از گروه</button>
       <b className="title-g" style={{fontFamily:'Yekan',fontSize:25}}>:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<div className="btn btn-d bg-danger ml-4" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
  <b className="title-d" style={{fontFamily:'Yekan',fontSize:25}}>بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:100}}>بحثی برای نمایش وجود ندارد</div>

       ) : (
         <div>
        {showdiscussion.map((current) => (
       
          <ul class="list-group text-right">
            
          <li class="list-group-item py-1">
          <div className="text-left">
                <small className="creator">
                {current.creator.username}
                :سازنده
                
                </small>
                <div className="text-right name-d" >
            <h6 className="pt-n3" style={{fontFamily:"Yekan",fontSize:19}}>{current.title}</h6>
            </div>
              </div>
              
            <small className="description" style={{fontFamily:"Yekan",fontSize:15}}>
                 {current.description}
                </small>
                
          </li>
        </ul>
      
        ))}
        </div>
        
       )}
       
  <div>
    </div>
     
       </div>


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
                         
                       margin="dense"
                         id="description"
                         style={{fontFamily:"Yekan"}}
                         value={newDiscussion.description}
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
    <div className="group-info">
    <button onClick={deletGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>حذف گروه</button>

    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25}}>:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<div className="btn btn-d bg-danger ml-4" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
    <b className="title-d" style={{fontFamily:'Yekan',fontSize:25}}>بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:100}}>بحثی برای نمایش وجود ندارد</div>

       ) : (
         <div>
        {showdiscussion.map((current) => (
       
          <ul class="list-group text-right">
            
          <li class="list-group-item py-1">
          <div className="text-left">
                <small className="creator">
                {current.creator.username}
                :سازنده
                
                </small>
                <div className="text-right name-d" >
            <h6 className="pt-n3" style={{fontFamily:"Yekan",fontSize:19}}>{current.title}</h6>
            </div>
              </div>
              
            <small className="description" style={{fontFamily:"Yekan",fontSize:15}}>
                 {current.description}
                </small>
                
          </li>
        </ul>
      
        ))}
        </div>
        
       )}
       
  <div>
    </div>
     
       </div>


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
                      label="عنوان بحث"
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
     
   
    
   
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:20,top:-190,position:"relative",marginLeft:600}}> ({ginfo.members_count}) اعضا</b>
       
       <div className="row" key={member.id}>
{member.length >=3 ?
          <div className="row" style={{top:-170,position:"relative",marginLeft:490}}>
            <div className="more" onClick={handleShow} style={{fontFamily:'Yekan',fontSize:20,top:19,position:"relative",marginLeft:-60, paddingRight:20}}>...بیش‌تر</div>

          <Avatar
          src={`http://127.0.0.1:8000${member[0].user.profile_photo}`}
          style={{
          fontSize: '80px',
         width: 70,
         height: 70}}
          
        />
        <div className="mt-5"> {member[0].user.username} </div>

        <Avatar
                  src={`http://127.0.0.1:8000${member[1].user.profile_photo}`}
                  style={{
                  fontSize: '80px',
                 width: 70,
                 height: 70}}
                  
                />
            <div className="mt-5"> {member[1].user.username} </div>

                <Avatar
                  src={`http://127.0.0.1:8000${member[2].user.profile_photo}`}
                  style={{
                  fontSize: '80px',
                 width: 70,
                 height: 70}}
                  
                />
              <div className=" mt-5"> {member[2].user.username} </div>

</div>
:
<div >
{member.map ((current) => (
  <div>
<Avatar
src={`http://127.0.0.1:8000${current.user.profile_photo}`}
style={{
fontSize: '80px',
width: 70,
height: 70}}

/>

      </div>
))}
    </div>

}
</div>

            <Modal show={show} onHide={handleClose} className="maodal">
        <Modal.Header closeButton>
           <div className="header"style={{fontFamily:'Yekan',paddingLeft:200}}>
          همه اعضا
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
        {member.map ((current) => (
       <div className="col-md" key={current.id}>
          <Avatar
          src={`http://127.0.0.1:8000${current.user.profile_photo}`}
          style={{
          fontSize: '80px',
         width: 70,
         height: 70}}
        />
        <div className="pl-2"> {current.user.username} </div>
        </div>
        ))}
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose} style={{fontFamily:'Yekan'}}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
           
        
</div>

</div>

</div>

</div>
</div>
    );

  }
  export default withRouter(GroupPage);