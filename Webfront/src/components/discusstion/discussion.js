import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {AiOutlineDislike} from 'react-icons/ai';
import {AiOutlineLike} from 'react-icons/ai';
import {AiFillLike} from 'react-icons/ai';
import {AiFillDislike} from 'react-icons/ai';
import axios from 'axios';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // Redirect,
    // Link,
    // useRouteMatch,
    // useParams,
    withRouter
  } from "react-router-dom";
  import {GoSearch} from 'react-icons/go';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {API_BASE_URL} from '../../constants/apiContants';

function Discussion(props) {

    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(1);
    const [commentsPagesNumber, setCommentsPagesNumber] = useState();
    const [commentAgain,setcommentAgain] = useState(0);
    useEffect(()=>{
          axios.get(API_BASE_URL + '/group/'+ 'props.groupid' +'/discussion/'+'props.discusid'+'/chat',
          {
            headers:{
           "Authorization":"Token "+Cookies.get("userToken")}
            })
        .then(response=>{
         setComments(response.data.comments);
         setCommentsPagesNumber(response.data.count)
          console.log(response);
        })
        .catch(error=>{
          console.log(error);
        });
      },[props.gruopid,commentAgain,commentsPage]);


    const[userComment,setUserComment]=useState("")
    const handleChangeComment = (e) => {
        const {value} = e.target   
        setUserComment(value);
        //console.log(e);
        //console.log(userComment);
      }

    const handleSubmitCommentClick = (e) => {
        //e.preventDefault();
        //console.log(userComment);
    
        if(userComment.length){
          const payload={
            "chat_text": userComment
          }
    
          console.log(payload);
          const back= JSON.stringify(payload);
          console.log(back);
          axios.post(API_BASE_URL + '/group/'+ 'props.groupid' +'/discussion/'+'props.discusid'+'/chat',
          back
          ,{
           headers:{
          "Content-Type":"application/json",
         "Authorization":"Token "+Cookies.get("userToken")}
          })
          .then(response=>{
            console.log(response);
    
            if(response.data.status==="success"){
              setOpenSnack(true);
              setMassage("نظر شما با موفقیت ثبت شد")
              setUserComment("");
              setcommentAgain(commentAgain+1);
    
            }
          })
          .catch(error=>{
            console.log(error);
          });
      
    
         }else{
          setOpenSnack(true);
          setMassage("نظر خالی است لطفاً چیزی بنویسید")
         }
    
      }

      const [massage,setMassage]=useState("");
      const[openSnack,setOpenSnack]=useState(false);
      const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };


  return(
    <div>
      <div className="mx-md-5 px-md-5">
        <div className="container-fluid rTOl text-right px-md-5 rounded-lg" >
          <div className="mx-md-5 my-5">
              <div>
                <h3 className="my-1 mx-md-5 rounded-lg" >عنوان</h3>
                <hr className="border border-dark"></hr>
                <div className="">
                  <h3 className="text-center" >نظر شما چیست؟</h3>
                  <div className="d-flex flex-wrap p-3  ">
                    <Avatar className="mx-auto" alt={Cookies.get('userName')} src={Cookies.get('userPic')} style={{width:60, height:60}} />
                    <div className="d-flex  flex-column mt-2 flex-fill">
                    <div className="d-flex flex-wrap">
                    <div className="flex-fill form-group mx-3">
    
                      <textarea className="form-control" rows="1" id="comment" name="text" onChange={handleChangeComment} value={userComment}></textarea>
    
                    </div>
                    
                    <div type="submit" className="btn btn-info rounded-lg shadow mx-auto align-self-start"
                    onClick={handleSubmitCommentClick}
                    >ثبت</div>
                    </div>
                    </div>
                  </div>
                  <Divider className="mt-3" variant="fullWidth" />
                </div>
              </div>
              <div>
                  
              </div>
          </div> 
        </div> 
      </div> 
    </div> 
    )


}

export default withRouter(Discussion);