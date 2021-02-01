import React, { useState, useEffect } from "react";
import axios from 'axios';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // Redirect,
    // Link,
    // useRouteMatch,
    //useHistory,
    //useParams,
    withRouter
  } from "react-router-dom";
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {API_BASE_URL} from '../../constants/apiContants';

function Discussion(props) {

  //console.log(props);

    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(1);
    const [commentsPagesNumber, setCommentsPagesNumber] = useState();
    const [commentAgain,setcommentAgain] = useState(0);
    const [discussion,setDiscussion] = useState([]);
    const [creator,setCreator] = useState([]);

    useEffect(()=>{
          axios.get(`${API_BASE_URL}/group/${props.match.params.groupId}/discussion/${props.match.params.discussionId}/chat?page=${commentsPage}`,
          {
            headers:{
           "Authorization":"Token "+Cookies.get("userToken")}
            })
        .then(response=>{
         setComments(response.data.chats);
         setCommentsPagesNumber(response.data.count)
          console.log(response);
        })
        .catch(error=>{
          console.log(error);
        });
      },[commentAgain,commentsPage]);

    useEffect(()=>{
        axios.get(API_BASE_URL + '/group/'+ props.match.params.groupId +'/discussion/'+ props.match.params.discussionId ,
        {
          headers:{
         "Authorization":"Token "+Cookies.get("userToken")}
          })
      .then(response=>{
       setDiscussion(response.data);
       setCreator(response.data.creator);
        console.log(response);
      })
      .catch(error=>{
        console.log(error);
      });
    },[]);



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
          axios.post(API_BASE_URL + '/group/'+ props.match.params.groupId +'/discussion/'+ props.match.params.discussionId +'/chat',
          back
          ,{
           headers:{
          "Content-Type":"application/json",
         "Authorization":"Token "+Cookies.get("userToken")}
          })
          .then(response=>{
            console.log(response);
    
            if(response.data.message==="new chat!"){
              setOpenSnack(true);
              setMassage("پاسخ شما با موفقیت ثبت شد")
              setUserComment("");
              setcommentAgain(commentAgain+1);
    
            }
          })
          .catch(error=>{
            console.log(error);
          });
      
    
         }else{
          setOpenSnack(true);
          setMassage("پاسخ خالی است لطفاً چیزی بنویسید")
         }
    
      }
    const handleDeleteComment = (id) => {
        axios.delete(API_BASE_URL + '/group/'+ props.match.params.groupId +'/discussion/'+ props.match.params.discussionId +'/chat/'+id ,
        {
          headers:{
         "Content-Type":"application/json",
        "Authorization":"Token "+Cookies.get("userToken")}
         }
        )
        .then(response=>{
          console.log(response);
          setcommentAgain(commentAgain+1);
        })
        .catch(error=>{
          console.log(error);
        });
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
        <div className="rTOl text-right px-md-5 mx-md-5" >
          <div className="mx-md-5 my-5 px-md-3 shadow border rounded-lg ">
              <div>
                <div className="d-flex flex-wrap mx-2  rounded-lg pt-3">
                  <div className="px-2">
                    <Avatar className="" alt={creator.username} src={`${API_BASE_URL}${creator.profile_photo}`} style={{width:60, height:60}} />
                    <h5 className="text-center mt-2">{creator.username}</h5>
                  </div>
                  <div className="d-flex flex-column flex-wrap mx-3">
                    <h1 className="my-1 rounded-lg " >{discussion.title}</h1>
                    <p className="my-1 ">{discussion.description}</p>
                  </div>
                </div> 
                <hr className="border border-dark"></hr>
                <div className="">
                  <div className="d-flex flex-wrap p-3 mx-2 ">
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
                  <Divider className="mt-2" variant="middle" />
                </div>
              </div>
              <div>
                <List >

                {comments === undefined ? (
                
                
                  <p >پاسخی برای نمایش وجود ندارد</p>
                
                 ) : (
                   <div>
                   
                   {comments.map ((current) => (
                   
                <div className="border border-dark rounded-lg m-1 px-2 color2" style={{direction:"rtl"}}>
                   <div className="d-flex px-md-3 py-3">
                     <Avatar alt={current.user.username} src={`${API_BASE_URL}${current.user.profile_photo}`} style={{width:60, height:60}} />
                     <div className="ml-auto mr-3">
                       <h5>
                         {current.user.username}
                       </h5>
                       <small>
                       {`${current.send_time.toString().split('T')[0]}`}
                       </small>
                     </div>
                
                
                     {current.user.id != Cookies.get("userId") ?(
                       <div></div>
                     ):(
                       <div className="btn m-n1" onClick={()=> handleDeleteComment(current.id)}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                         </svg>
                       </div>
                     )
                   }

               
                     
                   </div>
                   <p className="px-md-3">
                   
                     {current.chat_text}  
                   </p>
                   
                   
                   
                </div>
                ))}
                </div>

                    )} 

                </List>
                   
                {commentsPagesNumber === 1 || commentsPagesNumber === undefined?(
                 <p></p>
                ):(
                <div className="">
                {Array.from(Array(commentsPagesNumber),(e,i)=>{
                 return <div className="btn btn-light" 
                 onClick={()=>{setCommentsPage(i+1)}}
                 > {i+1} </div>
                })}
                </div>
                )}

              </div>
              <div>
         <Snackbar
              anchorOrigin={{ vertical:'top', horizontal:'center'}}
              open={openSnack}
              autoHideDuration={2500}
              onClose={handleCloseSnack}
              message={<div style={{fontFamily:'Yekan',fontSize:17}}>{massage}</div>}
            />
      </div>
          </div> 
        </div> 
      </div> 
    </div> 
    )


}

export default withRouter(Discussion);