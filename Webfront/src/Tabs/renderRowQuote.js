import "./Tabs.css";
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
 export function RenderRowquote(props) {
    const { index, style } = props;
    const [quote, setQuote] = useState([]);
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/user-profile/${Cookies.get('userId')}/MyQuotes`,{
        headers:{
    "Content-Type":"application/json",
   }
            })
        .then((res) => res.json())
        .then((data) => {
           console.log(data);
          setQuote(data);
        });
    }, []);
    return (
      <div>
      {quote.length===0 ? (
                 
        <div style={{fontFamily:"Mitra",fontSize:20,color:"red",fontWeight:"bold"}}>نقل‌قولی برای نمایش وجود ندارد</div>

       ) : (
         <div>
        {quote.map((current) => (
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
            primary={
              <div>
              <React.Fragment>
            {current.current_book.title}
              </React.Fragment>
              <p >
                          {`${current.sendtime.toString().split('T')[0]}  ${current.sendtime.toString().split('.')[0].split('T')[1]}`}
                          </p>
                          </div>
            }
            secondary={
            <React.Fragment  >
              {current.quote_text}
              
            </React.Fragment>
            }
          />
         
         <ListItemText style={{textAlign:"left",fontFamily:"Mitra",fontWeight:"bold"}}
         secondary={
           <React.Fragment>
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

  export default withRouter(RenderRowquote);
  