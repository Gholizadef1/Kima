import React from "react";
import ReactDOM from "react-dom";
import {CgProfile} from 'react-icons/cg';
import "./Avatar.css";
function App() {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
    const handleImageUpload = e => {
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
            display: "none"
          }}
        />
        <div
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
        </div>
        
      </div>
    );
  }
  
export default App;  