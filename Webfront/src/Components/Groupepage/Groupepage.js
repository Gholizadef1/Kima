
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/group")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setGinfo(data);
        console.log(data.photo);
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
            setMessage(data.data.message);
            console.log(data.data.message);
          })
      .catch(error=>{
        console.log(error);
      });
     
      
    }
    return(
      
      <div className="mx-md-5 pt-5 px-md-5">
        {ginfo.map((current) => (
      <div className="container-fluid text-center px-md-5 py-md-5" >
        <div className="mx-md-5 ">
        <div className="no-gutters shadow table-borderless my-5 mx-2 ">
        <img src={image} className="avatar img-responsive"/>
        
        <div class="card cardG">

  <div class="card-body">
    
    <img src={current.photo} className="imageg img-responsive"></img>
  </div>
    </div>
    <div>
        
    <div className="mt-n5">
  
    <b className="title-g" >{current.title}</b>
    </div>
    {message === "You joind this group!" ?
    <button onClick={joinGroup}  className="btn btn-g bg-primary" >اضافه‌شدن به گروه</button>
    :
    <div></div>
        }
    {message === "You leaved this group!" ?
    <button onClick={joinGroup}  className="btn btn-g bg-danger" >خارج‌شدن از گروه </button>
        :
        <div></div>
      }
    
    <hr className="line-g" style={{width:"37%"}}></hr>

    <div>
    </div>
    <div class="card cardb">
  <div class="card-body">
  <p className="text-right mr-3">{current.summary}

</p>
  </div>
    </div>
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:20,position:"relative",right:-495}}>بحث‌ها</b>
    {message === "You joind this group!"?
    <div></div>
      :
      <button className="btn bg-danger" style={{color:"white",fontFamily:"Yekan",marginRight:425,marginTop:15}}>اضافه‌کردن بحث</button>
      }
    <div class="card card-discussion">
  <div class="card-body">
  <p className="text-right">بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بحث بح ث
</p>
  </div>
    </div>
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:20,top:5,position:"relative",right:-200}}> (نفر۱۲۰) اعضا</b>

    <hr className="line-g1" style={{width:"47%"}}></hr>
    
      <div className = "slide">
            <div className="out">
                <img
                  
                  src={one}
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
 
))}
</div>


    );

  }
  export default withRouter(GroupPage);