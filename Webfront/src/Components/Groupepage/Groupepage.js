import React, {CuseState,useEffect} from "react";
import axios from 'axios';
import image from "../../assets/images.jpeg";
import './Groupepage.css';
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
  </div>
    </div>
    </div>
  

    );

  }
  export default withRouter(GroupPage);