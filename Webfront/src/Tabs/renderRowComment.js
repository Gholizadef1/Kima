import "./Tabs.css";
import {
    withRouter
  } from "react-router-dom";
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
 export function RenderRowComment(props) {
    const { index, style } = props;
    const [comment, setComment] = useState([]);
    useEffect(() => {
      fetch(`api/user-profile/${Cookies.get('userId')}/MyQuotes`,{
        headers:{
    "Content-Type":"application/json",
   "Authorization":"Token "+Cookies.get("userToken")}
            })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setComment(data);
        });
    }, []);
    return (
      <div>
        {comment.map((current) => (
        <ListItem alignItems="flex-start" key={current.id}>
        <ListItem
          alignItems="flex-start"
          style={{direction:"rtl"}}
         >
          <ListItemText style={{textAlign:"right"}}
            primary={current.title}
            secondary={
            <React.Fragment  >
              {current.author}
            </React.Fragment>
            }
          />
        </ListItem>
      </ListItem>
        ))}
      </div>
    );
    
        }

  export default withRouter(RenderRowComment);
  