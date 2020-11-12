import React, { useState } from 'react';
import './users.css';
import Sresult from './Sresult';
import {Link} from 'react-router-dom';
import HelpingNavbar, {NavBar} from './HelpingNavbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Button, Navbar } from 'react-bootstrap';
const UsersList = () =>{
  const [img,setImg]= useState("");
  const inputEvent=(event)=>{
    const data = event.target.value;
    console.log(data);
    setImg(data);
  };
  
  return(
  
    <div className="searchbar">
       
    <input type ="text" 
    placeholder="...جستجو" 
    value={img}
    onChange={inputEvent}/>
   {img === ""? null: <Sresult name={img}/>}
   
    </div>
    
  );
};
export default UsersList;