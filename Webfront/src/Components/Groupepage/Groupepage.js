
import axios from 'axios';
import image from "../../assets/5.jpeg";
import images from "../../assets/image.jpeg";
import one from "../../assets/1.jpeg";
import two from "../../assets/2.jpeg";
import './Groupepage.css';
import React, { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';


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
    const[openSnack,setOpenSnack]=useState(false);
    const [massage,setMassage]=useState("");
    
    const joinGroup =()=> {
      
      axios.post(
        "http://127.0.0.1:8000/api/group",
      {},
      {
       headers:{
      "Content-Type":"application/json",}
      }).then(response=>{
            props.history.push(`/jgroup`);
          
        }
      )
      .catch(error=>{
        console.log(error);
      });
      
    }
    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
          return;
        }
      setOpenSnack(false);
    };
    
    return(
      
      <div className="mx-md-5 pt-5 px-md-5">
      <div className="container-fluid text-center px-md-5 py-md-5" >
        <div className="mx-md-5 ">
        <div className="no-gutters shadow table-borderless my-5 mx-2 ">
        <img src={image} className="avatar img-responsive"/>
        
        <div class="card cardG">
        <div>
         <Snackbar
              anchorOrigin={{ vertical:'top', horizontal:'center'}}
              open={openSnack}

              autoHideDuration={2000}

              onClose={handleCloseSnack}
              message={massage}
            />
      </div>

  <div class="card-body">
    <img src={images} className="imageg img-responsive"></img>
  </div>
    </div>
    <div className="mt-n5">
    <b className="title-g" >آشفته‌حالان بیداربخت</b>
    <button onClick={joinGroup}  className="btn btn-g bg-primary" >اضافه‌شدن به گروه</button>
    </div>
    <hr className="line-g" style={{width:"37%"}}></hr>

    <div>
    </div>
    <div class="card cardb">
  <div class="card-body">
  <p className="text-right mr-3">اسکندر و سمندر در گردباد: سمندر و اسکندر از بالکن خانه‌های هم با یکدیگر صحبت می‌کنند؛ اما یک روز سمندر حرفی میزند که به ضررش تمام می‌شود.

</p>
  </div>
    </div>
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:20,position:"relative",right:-495}}>بحث‌ها</b>
      <button className="btn bg-primary" style={{color:"white",fontFamily:"Yekan",marginRight:425,marginTop:15}}>اضافه‌کردن بحث</button>
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
    );

  }
  export default withRouter(GroupPage);