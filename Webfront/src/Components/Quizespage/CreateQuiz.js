import React, {useEffect, useState} from "react";
import axios from 'axios';
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
  import {GoSearch} from 'react-icons/go';
import "./CreateQuiz.css";
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import image from "../../assets/5.jpeg";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {API_BASE_URL} from '../../constants/apiContants';



function Quizespage (props){
    return(
        
        <div className="mx-md-1 pt-5 px-md-5">
        <div>
       </div>
       <div className="container-fluid text-center px-md-5 py-md-5" >
         <div className="mx-md-5">
         <div className="no-gutters shadow table-borderless my-5 mx-2 ">
         <img src={image} className="avatar img-responsive"/>

         <div class="row rowin">
            
            <div className="form-group-sm text-right col-lg-5">
                <label className="mt-2 mb-n1" htmlFor="exampleInputEmail1">عنوان آزمونک</label>
                <input type="email" 
                       className="form-control input-normal text-right" 
                       id="email" 
                       //aria-describedby="emailHelp" 
                       //placeholder="Enter email" 
                       placeholder="...عنوان"
                       required
                      
                       
                />
                <label className="mt-2 mb-n1" htmlFor="exampleInputEmail1">توضیحات</label>
                <textarea className="form-control text-right" rows="1" id="comment" placeholder="...توضیح" name="text"></textarea>

                </div>
    </div>  
         </div>
         </div>
         </div>
         </div>
    )
}
export default withRouter(Quizespage);
