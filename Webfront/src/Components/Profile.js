import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
//import { Button } from 'react-bootstrap';
import "./Profile.css";

// class Profile extends Component{
//     state={
//         navigate:false
//     };
//     logout = () =>{
//         localStorage.clear("token");
//         this.setState({navigate:true});
//     };
//     render(){
//         const{navigate} = this.state;
//         if(navigate){
//             return <Redirect to = "/register" push = {true}/>;
//         }
//         return  <button type="button" class="btn-default"onClick = {this.logout} >خروج ازحساب</button>
//     } 
   
// }

// export default Profile;

function ProFile (props){
    const [state , setState]=useState(
        {
            navigate:false

        }
    )
    const logout = () =>{
        localStorage.clear("token");
        props.history.push('/login');
    }

    return(
        
        <div className="main-content">

            <div class="container-fluid">
                <div className="row">
                    <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                        <div className="card card-profile shadow">
                            <div class="row justify-content-center">
                                <div className="col-lg-3 order-lg-2">
                                    <div className="card-profile-image">
                                        <img src="index12.jpeg" className="rounded-circle"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-sm btn-info" onClick = {logout} >
                                    خروج ازحساب
                                </button>
                                </div>
                            </div>
                            <div className="card-body pt-0 pt-md-4">
                                <div className="row">
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                           <div>
                                                <span className="heading">2</span>
                                                <span className="description">می‌خواهم بخوانم</span>
                                            </div>
                                            <div>
                                                <span className="heading">1</span>
                                                <span className="description">دارم می‌خوانم</span>
                                            </div>
                                            <div>
                                                <span className="heading">8</span>
                                                <span className="description">خوانده‌ام</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3>
                                        فاطمه امیدی
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(ProFile);


