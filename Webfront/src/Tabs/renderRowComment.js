import {
    withRouter
  } from "react-router-dom";
import PropTypes from 'prop-types';
import {GoHeart} from 'react-icons/go';
import {AiOutlineLike} from 'react-icons/ai';
import {AiOutlineDislike} from 'react-icons/ai';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { red } from "@material-ui/core/colors";
 export function RenderRowcomment(props) {
    const { index, style } = props;
    const [comment, setComment] = useState([]);
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/user-profile/${Cookies.get('userId')}/MyQuotes`,{
        headers:{
    "Content-Type":"application/json",
   }
            })
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
          setComment(data);
        });
    }, []);
    return (
      <div>
      {comment.message === "No Comment!" ? (                   
      <div style={{fontFamily:"Mitra",fontSize:20,color:"red",fontWeight:"bold",marginTop:200}}>نظری برای نمایش وجود ندارد</div>

        
       ) : (
         <div>
        {comment.map((current) => (
        <ListItem alignItems="flex-start" key={current.id}>
        <ListItem
          alignItems="flex-start"
          style={{direction:"rtl"}}
         >
        
          <ListItemText style={{textAlign:"right"}}
            primary={
              <List >
            <div className="" style={{direction:"rtl"}}>
              <div className="d-flex p-3 mt-n4">
              <Avatar  src={current.current_book.smallimgurl} style={{width:60, height:60}} />
              <div className="ml-auto mr-3">
                <h5>
                {current.current_book.title}
                </h5>
                <small>
                {`${current.sendtime.toString().split('T')[0]}  ${current.sendtime.toString().split('.')[0].split('T')[1]}`}
                </small>
              </div>
              <div className="d-flex flex-column">
                <small className="mr-3">
                {current.Likes}
                <AiOutlineDislike color="blue" size="25"/>
                </small>
              </div>
              <div className="d-flex flex-column">
                <small className="mr-4">
                {current.Likes}
                <AiOutlineLike  color="blue" size="25"/>
                </small>
              </div>
             </div>
 
             <p>
            {current.quote_text.split ('\n').map ((item, i) => <p key={i}>{item}</p>)}

             </p>
             <hr style={{width:"100%",color:"#333",backgroundColor:"#333"}}></hr>
              </div>
            </List>
             }
            />
            </ListItem>
            </ListItem>
        ))}
        </div>
       )}
       </div>
    );
          }
  export default withRouter(RenderRowcomment);
  