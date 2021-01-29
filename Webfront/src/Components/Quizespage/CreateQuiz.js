import React, {useEffect, useState} from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
  import {GoSearch} from 'react-icons/go';
import "./CreateQuiz.css";
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import image from "../../assets/5.jpeg";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {API_BASE_URL} from '../../constants/apiContants';



function Quizespage (props){
    const [newGroup,setNewGroup] = useState({
        picture: "",
        name : "",
        description :""
       // backError : ""
      })
    const [state , setState]=useState(
        {
            navigate:false,
            file:null
        }
      )
    const imageUploader = React.useRef(null);
    const uploadedImage = React.useRef(null);

    const handleImageUpload = e => {
        setState({file:e.target.files[0]});
        const [file] = e.target.files;
        if (file) {
          const reader = new FileReader();
          const { current } = uploadedImage;
          current.file = file;
          reader.onload = e => {
            //current.src = e.target.result;
            setNewGroup(prevState => ({
              ...prevState,
              picture : e.target.result
          }));
      
          };
          reader.readAsDataURL(file);
        }
    };
    return(
        
        <div className="mx-md-1 pt-5 px-md-5">
        <div>
       </div>
       <div className="container-fluid text-center px-md-5 py-md-5" >
         <div className="mx-md-5">
         <div className="no-gutters shadow table-borderless my-5 mx-2 ">
         <img src={image} className="avatar img-responsive"/>
         <div className="name">
  
  <b className=""style={{position:'relative'}}>ساخت آزمونک  
  </b>
  </div>
         <div class="row rowin">
            
            <div className="form-group-sm text-right col-lg-5">
                <label className="mt-2 mb-n1" htmlFor="exampleInputEmail1">عنوان آزمونک</label>
                <input type="email" 
                       className="form-control input-normal text-right" 
                       id="email" 
                       //aria-describedby="emailHelp" 
                       //placeholder="Enter email" 
                       placeholder="...عنوان"
                       required
                      
                       
                />
                <label className="mt-2 mb-n1" htmlFor="exampleInputEmail1">توضیحات</label>
                <textarea className="form-control text-right" rows="1" id="comment" placeholder="...توضیح" name="text"></textarea>
                <div>
                  <input class="form-control" 
                  type="file" accept="image/*" 
                  onChange={handleImageUpload} 
                  ref={imageUploader} 
                  style={{ display: "none",color:"white" }} />

                  <div className="btn mr-5 mt-n4" onClick={() => imageUploader.current.click()}>
                    <svg className="mt-4"  style={{width:30,height:30}} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                    </svg>
                  </div>
                  <label src={newGroup.picture} ref={uploadedImage} className="" htmlFor="exampleInputEmail1">انتخاب عکس</label>


                  </div>
                </div>
    </div>  
         </div>
         </div>
         </div>
         </div>
    )
}
export default withRouter(Quizespage);
