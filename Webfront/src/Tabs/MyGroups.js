import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { Modal, Form } from "react-bootstrap";  
import Cookies from 'js-cookie';
import Tabs from '../Tabs/Tabs';
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
                                        <img   alt="" className="rounded-circle img-fluid" style={{

                                                                         width: 135,
                                                                         height: 135,


                                                                         display: "block"}}/>

                                </div>
                            </div>

                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col">

                                <hr className="line" style={{width:"100%",color:"#333",backgroundColor:"#333"}}></hr>
                                        <div className="d-flex justify-content-between text-right mt-md-2">

                                        <b className="description decsciptionmine ml-4">می‌خواهم بخوانم</b>
                                        <b className="description decsciptionmine mr-4">دارم می‌خوانم</b>
                                        <b className="description decsciptionmine mr-4 ml-1">خوانده‌ام</b>
                                        </div>   {/* < FaRegSmileBeam/> */}
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


