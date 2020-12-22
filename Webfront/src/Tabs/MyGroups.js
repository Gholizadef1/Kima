import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { Modal, Form } from "react-bootstrap";  
import Cookies from 'js-cookie';
import Tabs from '../Tabs/Tabs';
import image from '../Components/index.jpeg';
import './Mygroup.css';
function MyGroups (props){

    return(
        <div className="main-content">
            <div class="container-fluid">
                <div className="row">
               
                        <div className="card cardc">
                            <div className=" d-flex justify-content-end">

                                <div className="col-7 mt-5 text-center ">
                                    
                                </div>
                                    <div className="profile col-md-5 pl-1 mr-n3 mt-n1 ">
                                        <img src={image}  alt="" className="rounded-circle img-fluid" style={{

                                                                         width: 135,
                                                                         height: 135,


                                                                         display: "block"}}/>

                                </div>
                            </div>

                            <div className="card-body pt-0">
                            
                                <div className="row">
                                    
                                    <div className="col">
                                <hr className="line1" style={{width:"125%",color:"#333",backgroundColor:"#333"}}></hr>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            </div>
                            </div>
                          </div>
                          </div>
                    
                    
    )
    
} 

export default MyGroups;


