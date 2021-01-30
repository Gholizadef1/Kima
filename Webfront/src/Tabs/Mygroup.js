import {AiFillStar} from "react-icons/ai";

import "./Mygroup.css";
import Scroll from "../Components/Scroll";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import List from '@material-ui/core/List';


export function Mygroup(props) {

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
             console.log(data.Count);
            setMygroup(data.data);
            setMygroupc(data.Count);
          });
      }, []);
      return(     
          <div>
      {groupcount===0 ? (                   
      <div className="Nogroup" style={{fontFamily:"Yekan",fontSize:20,color:"red",fontWeight:"bold"}}>گروهی برای نمایش وجود ندارد</div>

        
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
              <div className="d-flex p-n1 pb-n5 mt-n3">
              <img  className="g-img img-responsive"  src={current.group_photo} />
              <div className="booktitle ml-auto mr-3">
              <div>
              <b className="">نام گروه:  {current.title}</b>
              </div>
             
                <small className=" member mr-2">
                    تعداد اعضا: {current.members_count}
                
                </small>
                {current.owner.username === Cookies.get("userName") ?
                <p className="mr-2 mb-1 creator">
                <AiFillStar></AiFillStar>
                سازنده: {current.owner.username}
                
            
            </p>
                :
                <p className="mr-2 mb-1" style={{fontSize:20,fontFamily:"Yekan"}}>
                    سازنده: {current.owner.username}
                
                </p>
            }
                <p  className="tozih mr-2">
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
  );
}
export default Mygroup;