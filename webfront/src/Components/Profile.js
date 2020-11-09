import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import { Button } from 'react-bootstrap';
import "./Profile.css";

class Profile extends Component{
    state={
        navigate:false
    };
    logout = () =>{
        localStorage.clear("token");
        this.setState({navigate:true});
    };
    render(){
        const{navigate} = this.state;
        if(navigate){
            return <Redirect to = "/register" push = {true}/>;
        }
        return  <button type="button" class="btn-default"onClick = {this.logout} >خروج ازحساب</button>
    } 
   
}

export default Profile;