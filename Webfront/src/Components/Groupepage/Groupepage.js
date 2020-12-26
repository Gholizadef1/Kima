import React, {CuseState,useEffect} from "react";
import axios from 'axios';
import image from "../../assets/images.jpeg";
import images from "../../assets/image.jpeg";
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
        <div className="main-content">
        <img src={image} className="avatar img-responsive"/>
        
        <div class="card cardG">
  
  <div class="card-body">
    <img src={images} className="imageg img-responsive"></img>
  </div>
    </div>
    <div className="mt-n5">
    <b className="title-g" style={{fontFamily:'Yekan',fontSize:25,top:-15,position:"relative",left:40}}>آشفته‌حالان بیداربخت</b>
    </div>
    <hr className="line-g" style={{width:"43%"}}></hr>
    <div class="card cardb">
  <div class="card-body">
  <p>اسکندر و سمندر در گردباد: سمندر و اسکندر از بالکن خانه‌های هم با یکدیگر صحبت می‌کنند؛ اما یک روز سمندر حرفی میزند که به ضررش تمام می‌شود.

</p>
  </div>
    </div>
    

    </div>
  

    );

  }
  export default withRouter(GroupPage);