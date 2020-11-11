import React, { useState } from 'react';
import './users.css';
import Sresult from './Sresult';
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
    placeholder="type here" 
    value={img}
    onChange={inputEvent}/>
   {img === ""? null: <Sresult name={img}/>}
    </div>
  );
};
export default UsersList;