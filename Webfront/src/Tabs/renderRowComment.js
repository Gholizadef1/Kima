import {
    withRouter
  } from "react-router-dom";
import PropTypes from 'prop-types';
import {GoHeart} from 'react-icons/go';
import {AiOutlineLike} from 'react-icons/ai';
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
      fetch(`http://127.0.0.1:8000/api/user-profile/${Cookies.get('userId')}/mycomments`,{
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
                 
        <p>هیچ نظری ثبت نشده</p>

       ) : (
         <div>
        {comment.map((current) => (
        <ListItem alignItems="flex-start" key={current.id}>
        <ListItem
          alignItems="flex-start"
          style={{direction:"rtl"}}
         >
           <ListItemAvatar>
              <Avatar
                
                src={current.current_book.smallimgurl}
              />
            </ListItemAvatar>
          <ListItemText style={{textAlign:"right"}}
            primary={current.current_book.title}
            secondary={
            <React.Fragment  >
              {current.quote_text}
            </React.Fragment>
            }
          />
         
         <ListItemText style={{textAlign:"left",fontFamily:"Mitra",fontWeight:"bold"}}
         secondary={
           <React.Fragment>
             {`${current.sendtime.toString().split('T')[0]}  ${current.sendtime.toString().split('.')[0].split('T')[1]}`}
             <GoHeart color="red" size="25"/>
             </React.Fragment>
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
  