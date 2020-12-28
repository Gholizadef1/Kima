
import axios from 'axios';
import image from "../../assets/5.jpeg";
import images from "../../assets/image.jpeg";
import one from "../../assets/1.jpeg";
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
    const[message,setMessage]= useState("");
    const [members,setMembers] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/group/details/12")
      
      .then((data) => {
         console.log(data);
        setGinfo(data.data);
        
        console.log(data);
        if(data.data.owner.username === Cookies.get('userName')){
          setMessage("You joind this group!");
        }
        if(data.data.owner.username != Cookies.get('userName')){
          setMessage("You leaved this group!");
        }
       
      });
      
  }, []);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/group/members/${Cookies.get('userId')}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMembers(data);
        //console.log(data[0].user.username);
      });
  }, []);
    const joinGroup =()=> { 
      axios.post(
        `http://127.0.0.1:8000/api/group/members/${Cookies.get('userId')}`,
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
 
      
    }

    return(
      
      <div className="mx-md-1 pt-5 px-md-5">
       
      <div className="container-fluid text-center px-md-5 py-md-5" >
        <div className="mx-md-5">
        <div className="no-gutters shadow table-borderless my-5 mx-2 ">
        <img src={image} className="avatar img-responsive"/>
        
        <div class="card cardG">

  <div class="card-body">
    
    <img src={ginfo.photo} className="imageg img-responsive"></img>
  </div>
    </div>
    <div>
        
    <div className="mt-n5 ml-5">
  
    <b className="title-g" >{ginfo.title}</b>
    </div>

    {message === "You joind this group!" ?
    <div>
    <button onClick={joinGroup}  className="btn btn-g bg-danger" style={{color:'white'}}>خارج‌شدن از گروه</button>
    <button className="btn bg-danger" style={{color:"white",fontFamily:"Yekan",marginRight:550,marginTop:200}}>اضافه‌کردن بحث</button>
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
    

    <hr className="line-g" style={{width:"37%"}}></hr>
    <div class="card cardb">
  <div class="card-body">
  <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:20,position:"relative",right:-495}}>دربارهٔ گروه</b>

  <p className="text-right mr-3 summary" >{ginfo.summary}

</p>
  </div>
    </div>
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:20,position:"relative",right:-495}}>بحث‌ها</b>
    <div class="card card-discussion">
  <div class="card-body">
  <p className="text-right">بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بح ث
</p>
  </div>
    </div>

    <hr className="line-g1" style={{width:"47%"}}></hr>
    
      <div className = "slide">
     
            <div className="out">
                  <b className="title-g" style={{fontFamily:'Yekan',fontSize:20,top:5,position:"relative",right:-200}}> ({ginfo.members_count}) اعضا</b>

                <img
                  
                  src={""}
                  height={90}
                  width={70}
                  style={{paddingRight:10,paddingBottom:10}}
                />
                <img
                  
                  src={two}
                  height={90}
                  width={70}
                  style={{paddingRight:10,paddingBottom:10}}
                />
                </div>
               
         </div>
   
</div>
</div>
</div>
</div>

</div>


    );

  }
  export default withRouter(GroupPage);