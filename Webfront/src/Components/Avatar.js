import React, { useState } from "react";
import ReactDOM from "react-dom";
import {CgProfile} from 'react-icons/cg';
import "./Avatar.css";
import axios from "axios";
import { Form,Button } from "react-bootstrap";
import { event } from "jquery";
class Avatar extends React.Component {
 state={
   selectedfile:this.state.selectedfile
 }
  fileSelectedHandler=event=>{
    this.setState({
    selectedfiles:event.target.files[0]
    })
  }
  uploadHandler=()=>{
    const fd = new FormData();
    fd.append('image',this.state.selectedfile,this.state.selectedfile.name);

axios.put('api/update-profile',fd)
.then(res=>{
  console.log(res);
});
}
  render(){
    return (
      <div>
     <input type="file" onChange={this.fileSelectedHandler}/>
     <button onClick={this.uploadHandler}>upload</button>
     </div>
    );
  }
}
export default Avatar;  