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
        
        <div>
            
            <button type="button" class="btn-default" onClick = {logout} >
                خروج ازحساب
            </button>
        </div>
    )
}

export default withRouter(ProFile);


