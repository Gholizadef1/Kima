import React, { useState } from "react";
import "./Avatar.css";
import axios from "axios";

function Avatar(props) {
  const [state,setState] =useState( {
    file:null
  })
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        setState({file:false})
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    const handleUpload= e =>{
  let file=state.file
  let formdata = new FormData()
  formdata.append("image",file)
  
  axios({
    url:'api/update-profile',
    method:"POST",
    headers:{
    
    }
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
        border: "1px dashed black"
      }}
      onClick={() => imageUploader.current.click()}
    >
      <img className="avatar"

        ref={uploadedImage}
      />
      <button className="hit" type="button"onClick={handleUpload}>Upload</button>
    </div>

  </div>
  );
        }
export default Avatar;  