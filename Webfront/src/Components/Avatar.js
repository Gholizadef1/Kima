import React, { useState } from "react";
import "./Avatar.css";
import axios from "axios";
import Cookies from 'js-cookie';
import { Form } from "react-bootstrap";
function Avatar(props) {
  const [state,setState] =useState( {
    file:null
  })
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const handleImageUpload = e => {
      setState({file:e.target.files[0]});
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
  const handleUpload= e =>{

  var formdata = new FormData()
  formdata.append('profile_photo',state.file)
  // formdata.append('username','file')
   axios.put('http://127.0.0.1:8000/api/update-profile/'
   ,formdata,{
     headers:{
       
    "Content-Type":"application/json",
    "Authorization":"Token "+Cookies.get("userToken")}
     }
  
  ).then(function(res){
    console.log("Token" +Cookies.get("userToken"))
  })
  
  .then(function(res){
    console.log(res);
  })
  .catch(function(res){
    console.log(res);
  })
}
  return (
   
    <div
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <input 
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      ref={imageUploader}
      style={{
        display: "none",
      }}
    />
    <div className="in"
      style={{
        height: "60px",
        width: "60px",
        
      }}
      onClick={() => imageUploader.current.click()}
    >
      <img className="avatar"
        ref={uploadedImage}
      />
      
    </div>
    <button className="hit" type="button"onClick={handleUpload}>Upload</button>

  </div>
  );
        }
export default Avatar;  