import React, {Component,useState,useEffect} from "react";
import {Redirect,withRouter} from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Modal, Form } from "react-bootstrap";  
import Cookies from 'js-cookie';
import Tabs from '../Tabs/Tabs';
import image from '../Components/index.jpeg';
import './Mygroup.css';
function MyGroups (props){
    const[mygroup,setMygroup] = useState([]);
    const[groupcount,setMygroupc] = useState();
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/user/${Cookies.get('userId')}/group`,{
          headers:{
      "Content-Type":"application/json",
     }
              })
          .then((res) => res.json())
          .then((data) => {
             console.log(data.data);
            setMygroup(data.data);
            setMygroupc(data.Count);
          });
      }, []);
    return(
        <div className="main-content">
            <div class="container-fluid">
                <div className="row">
               
                        <div className="card cardc">
                        <div>
      {groupcount===0 ? (                   
      <div style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold",marginTop:200}}>نظری برای نمایش وجود ندارد</div>

        
       ) : (
         <div>
        {mygroup.map((current) => (
        <ListItem alignItems="flex-start" key={current.id}>
        <ListItem
          alignItems="flex-start"
          style={{direction:"rtl"}}
         >
        
          <ListItemText style={{textAlign:"right"}}
            primary={
              <List >
            <div className="" style={{direction:"rtl"}}>
              <div className="d-flex p-n1 pb-n5 mt-n5">
              <img  className="squere img-responsive"  src={current.group_photo} style={{width:63, height:100}} />
              <div className="booktitle ml-auto mr-3"style={{fontFamily:"Yekan",fontSize:19}}>
              <div>
              <b className="">نام گروه:  {current.title}</b>
              </div>
                <small className=" dislike mr-2" style={{fontSize:20,fontFamily:"Yekan"}}>
                    تعداد اعضا: {current.members_count}
                
                </small>
                <p  className="quote"style={{fontFamily:"Yekan",fontSize:20}}>
                     توضیحات گروه: {current.summary}

             </p>
              </div>
              <div className="d-flex flex-column">
                
              </div>
              <div className="d-flex flex-column">
               
              </div>
             </div>
 
        
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
                                  
                                
                            </div>
                            </div>
                            </div>
                          
                          </div>
                    
                    
    )
    
} 

export default MyGroups;


