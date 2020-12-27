import React, {CuseState,useEffect} from "react";
import axios from 'axios';
import image from "../../assets/5.jpeg";
import images from "../../assets/image.jpeg";
import one from "../../assets/1.jpeg";
import two from "../../assets/2.jpeg";
import './Groupepage.css';
import Divider from '@material-ui/core/Divider';

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


    return(
      <div className="mx-md-5 pt-5 px-md-5">
      <div className="container-fluid text-center px-md-5 py-md-5" >
        <div className="mx-md-5 ">
        <div className="no-gutters shadow table-borderless my-5 mx-2 ">
        <img src={image} className="avatar img-responsive"/>
        
        <div class="card cardG">
  
  <div class="card-body">
    <img src={images} className="imageg img-responsive"></img>
  </div>
    </div>
    <div className="mt-n5">
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:4,position:"relative",left:345}}>آشفته‌حالان بیداربخت</b>
    <button className="btn bg-primary" style={{color:"white",fontFamily:"Yekan",marginRight:545,marginTop:-8}}>اضافه‌شدن به گروه</button>
    </div>
    <hr className="line-g" style={{width:"37%"}}></hr>

    <div>
    </div>
    <div class="card cardb">
  <div class="card-body">
  <p className="text-right mr-4">اسکندر و سمندر در گردباد: سمندر و اسکندر از بالکن خانه‌های هم با یکدیگر صحبت می‌کنند؛ اما یک روز سمندر حرفی میزند که به ضررش تمام می‌شود.

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
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:5,position:"relative",right:-320}}> (نفر۱۲۰) اعضا</b>

    <hr className="line-g1" style={{width:"52%"}}></hr>
    
      <div className = "slide">
            <div className="out">
                <img
                  
                  src={one}
                  height={70}
                  width={120}
                />
                <img
                  
                  src={two}
                  height={70}
                  width={120}
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