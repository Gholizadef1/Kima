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
  import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
  } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';

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
    
          if(data.statusText==="OK"){
            setOpenSnack(true);
            setMassage("!شما با مؤفقیت به گروه اضافه شدید")
           
        }
          console.log(data.statusText);
         
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
          if(data.message ==="You leaved this group!"){
            setOpenSnack(true);
            setMassage("!شما با مؤفقیت از گروه خارج شدید")
           
        }
          console.log(data.statusText);
          
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
          if(data.message ==="You leaved this group!"){
            setOpenSnack(true);
            setMassage("!شما با مؤفقیت گروه خود را حذف کردید")
           
        }
          console.log(data.statusText);
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
          [id] : value,
          
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
            
         
          })
    }, [showdiscussion,props.match.params.groupId]);

    const handleCreateDiscussionSubmit =(e) =>{
      axios.post(
        "http://127.0.0.1:8000/api/group/"+ props.match.params.groupId+"/discussion",backtitle,
      {
        headers:{
          "Content-Type":"application/json",
         "Authorization":"Token "+Cookies.get("userToken")}
          })
          setNewDiscussion("");
         
    }
    
  const handleClickOpenCreateDiscussion = () => {
    setOpenCreateDiscussion(true);
    setJoin(true);
  };
  const [massage,setMassage]=useState("");
  const[openSnack,setOpenSnack]=useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
      }
    setOpenSnack(false);
  };

    return(
      
      <div className="mx-md-1 pt-5 px-md-5">
       <div>
         <Snackbar
              anchorOrigin={{ vertical:'top', horizontal:'center'}}
              open={openSnack}

              autoHideDuration={5000}

              onClose={handleCloseSnack}
              message={massage}
            />
      </div>
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
        
    <div className=" name">
  
  <b className="">نام گروه:  {ginfo.title}</b>
  </div>


    {joinduser === "You joind this group!" ?
    <div className="group-info">
    <button onClick={leaveGroup}  className="btn btn-g btn-info rounded-lg" style={{color:'white'}}>خارج‌شدن از گروه</button>
    <b className="title-g">:دربارهٔ گروه</b>
  <h5 className="text-right summary">{ginfo.summary}
</h5>
<div className="btn btn-d btn-info rounded-lg ml-4" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
  <b className="title-d">بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div className="no-discussion" style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold"}}>بحثی برای نمایش وجود ندارد</div>

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
               
<p><b><a className="pt-n3" href="default.asp" target="_blank">{current.title}</a></b></p>
            
            </div>
              </div>
              
            <h5 className="description" style={{fontFamily:"Yekan",fontSize:20}}>
                 {current.description}
                </h5>
                
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
           <div class=" p-4">
                   <form>
                       <div class="form-group align-items-center text-right">
                           <div class="my-1">
                               <label  style={{fontFamily:'Yekan'}}>عنوان بحث</label>
                               <input type="text"
                                 class="form-control rounded-pill"
                                
                                 id="name"
                                 value={newDiscussion.name}
                                 
                                 type="title"
                                 onChange={handleChange}/>
                           </div>
                           <div class=" my-2">
                               <div class="my-1">
                               <label style={{fontFamily:"Yekan"}}>دربارهٔ بحث</label>
                               <input type="password"
                                
                                 id="description"
                                 style={{fontFamily:"Yekan"}}
                                 value={newDiscussion.description}
                                 
                                 type="description"
                                 onChange={handleChange}
                                 class="form-control rounded-pill"/>
                           </div>   
                           </div>
                           </div>
                           </form>
                           </div>
                   
                     </DialogContent>
                     <DialogActions>
                       <button className="btn btnDE btn-info rounded-lg" onClick={handleCloseCreateGroup} color="black">
                       انصراف
                       </button>
                       <button className="btn btnD btn-info rounded-lg" onClick={handleCreateDiscussionSubmit} color="black">
                         ثبت
                       </button>
                     </DialogActions>
                   </Dialog>
   </div>

      :
      <div></div>
      }
     {user ==="" && joinduser==="" && owner==="" ?
     <div className="group-info">      
       <button onClick={joinGroup}  className="btn btn-g btn-info rounded-lg" style={{color:'white'}}>اضافه‌شدن به گروه</button>
       <b className="title-g">:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<Tooltip  title= {<div style={{color: "black",
        fontFamily:"Yekan",
        fontSize:20,
        
        width:190,
        height:80,
        textAlign:"center",
        marginLeft:-9,
        paddingTop:20,}}>برای ساخت بحث جدید باید در گروه عضو باشید</div>}> 
<div className="btn btn-d bg-info ml-4" style={{color:"white"}}>
 بحث جدید
                </div>
                </Tooltip>
                
  <b className="title-d">بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div className="no-discussion" style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold"}}>بحثی برای نمایش وجود ندارد</div>

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
              
            <h5 className="description" style={{fontFamily:"Yekan",fontSize:20}}>
                 {current.description}
                </h5>
                
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
        <button onClick={joinGroup}  className="btn btn-g btn-info rounded-lg" style={{color:'white'}}>اضافه‌شدن به گروه</button>
        <b className="title-g">:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<Tooltip  title= {<div style={{color: "black",
        fontFamily:"Yekan",
        fontSize:20,
        
        width:190,
        height:80,
        textAlign:"center",
        marginLeft:-9,
        paddingTop:20,}}>برای ساخت بحث جدید باید در گروه عضو باشید</div>}> 
<div className="btn btn-d bg-info ml-4" style={{color:"white"}}>
 بحث جدید
                </div>
                </Tooltip>
  <b className="title-d">بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:30}}>بحثی برای نمایش وجود ندارد</div>

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
            <h6 className="pt-n3">{current.title}</h6>
            </div>
              </div>
              
            <h5 className="description" style={{fontFamily:"Yekan",fontSize:20}}>
                 {current.description}
                </h5>
                
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
       <button onClick={leaveGroup}  className="btn btn-g btn-info rounded-lg" style={{color:'white'}}>خارج‌شدن از گروه</button>
       <b className="title-g">:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<div className="btn btn-d bg-info ml-4" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
  <b className="title-d">بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:30}}>بحثی برای نمایش وجود ندارد</div>

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
            <h6 className="pt-n3">{current.title}</h6>
            </div>
              </div>
              
            <h5 className="description" style={{fontFamily:"Yekan",fontSize:20}}>
                 {current.description}
                </h5>
                
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
           <div class=" p-4">
                   <form>
                       <div class="form-group align-items-center text-right">
                           <div class="my-1">
                               <label  style={{fontFamily:'Yekan'}}>عنوان بحث</label>
                               <input type="text"
                                 class="form-control rounded-pill"
                                
                                 id="name"
                                 value={newDiscussion.name}
                                
                                 type="title"
                                 onChange={handleChange}/>
                           </div>
                           <div class=" my-2">
                               <div class="my-1">
                               <label style={{fontFamily:"Yekan"}}>دربارهٔ بحث</label>
                               <input type="password"
                                
                                 id="description"
                                 style={{fontFamily:"Yekan"}}
                                 value={newDiscussion.description}
                                
                                 type="description"
                                 onChange={handleChange}
                                 class="form-control rounded-pill"/>
                           </div>   
                           </div>
                           </div>
                           </form>
                           </div>
                   
                     </DialogContent>
                     <DialogActions>
                     <button className="btn btnDE btn-info rounded-lg" onClick={handleCloseCreateGroup} color="black">
                       انصراف
                       </button>
                       <button className="btn btnD btn-info rounded-lg" onClick={handleCreateDiscussionSubmit} color="black">
                         ثبت
                       </button>
                     </DialogActions>
                   </Dialog>
   </div>

      :
      <div></div>
      }
    
    
    
    {owner === 'You are owner!' ?
    <div className="group-info">
      <button type="button" className="btn btn-g btn-info rounded-lg" style={{color:'white'}} data-toggle="modal" data-target="#exampleModal">
  حذف گروه
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style={{fontFamily:"Yekan",fontSize:20}}>
       !آیا مطمئن هستید که می‌خواهید گروه را حذف کنید؟
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btnno btn-info rounded-lg" data-dismiss="modal">!خیر</button>
        <button onClick={deletGroup} data-dismiss="modal"  type="button" class=" btn btnbale btn-info rounded-lg">!بله</button>
      </div>
    </div>
  </div>
</div>

    <b className="title-g">:دربارهٔ گروه</b>
  <p className="text-right summary" >{ginfo.summary}
</p>
<div className="btn btn-d bg-info ml-4" style={{color:"white"}} onClick={handleClickOpenCreateDiscussion}>
 بحث جدید
                </div>
    <b className="title-d">بحث‌ها</b>
   
    <div class="card card-discussion">
  
    <div class="overflow-auto">
   
      {showdiscussion.length === 0  ? (
                 
        <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:30}}>بحثی برای نمایش وجود ندارد</div>

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
            <h6 className="pt-n3">{current.title}</h6>
            </div>
              </div>
              
            <h5 className="description" style={{fontFamily:"Yekan",fontSize:20}}>
                 {current.description}
                </h5>
                
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
           <div class=" p-4">
                   <form>
                       <div class="form-group align-items-center text-right">
                           <div class="my-1">
                               <label  style={{fontFamily:'Yekan'}}>عنوان بحث</label>
                               <input type="text"
                                 class="form-control rounded-pill"
                                
                                 id="name"
                                 value={newDiscussion.name}
                                 
                                 type="title"
                                 onChange={handleChange}/>
                           </div>
                           <div class=" my-2">
                               <div class="my-1">
                               <label  style={{fontFamily:"Yekan"}}>دربارهٔ بحث</label>
                               <input type="password"
                                
                                 id="description"
                                 style={{fontFamily:"Yekan"}}
                                 value={newDiscussion.description}
                                 
                                 type="description"
                                 onChange={handleChange}
                                 class="form-control rounded-pill"/>
                           </div>   
                           </div>
                           </div>
                           </form>
                           </div>
                   
                     </DialogContent>
                     <DialogActions>
                     <button className="btn btnDE btn-info rounded-lg" onClick={handleCloseCreateGroup} color="black">
                       انصراف
                       </button>
                       <button className="btn btnD btn-info rounded-lg" onClick={handleCreateDiscussionSubmit} color="black">
                         ثبت
                       </button>
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