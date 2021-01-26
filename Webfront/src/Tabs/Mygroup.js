
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
  );
}
export default Mygroup;