import axios from 'axios';
import React, { useState, useEffect } from "react";
import Horizontal from 'react-scroll-horizontal';
 import "./UsersList.css";
 import "./HelpingNavbar";

function UsersList() {
  const [user,setUser] = useState({user:null});
  const [search,setSearch] = useState([]);
  const [users,setUsers] = useState([]);
 
 const handleChange = event => {
    setUser({ user: event.target.value });
  }

const searchUsers = async () => {
try {
const result = await axios.get(`http://127.0.0.1:8000/dyanmicsearch/?search=${user.user}&search_fields=author&search_fields=title`,
 ).then((res)=> {
 setSearch(res.data.results)
  
});
if (search == [null]) {
setSearch([]);
} else {
setSearch(result.data);
}
}
catch (err) {}
};

useEffect(() => {
  searchUsers();
  }, [user]);

    return ( 
      
    <div className="row">
       <input type="text" name="name" onChange={handleChange}  value={user.user} style={{position:"absolute",left:1000,top:18,textAlign:"right"}} placeholder="جستجوی کتاب یا نویسنده" />
    <div class="brand1">نتایج</div> 
    {search.length === 0 ? (
      <div className="spinner-border" role="status">
        <div className="sr-only">Loading...</div>
      </div>
      
    ) : (
     
    
    <Horizontal className="horizontal" style={{height:200,position:"absolute",width:700}}>
       
          {search.map((item) => (
        <div className="out1" key={item.id}>
          
            <img
              className="squere1" 
              
              src={item.imgurl}
            /> 
            <small className= "title">
            <h5 className="card-title3">{item.title}</h5>
            <h5 className="card-title4">{item.author}</h5>
             </small>
             
          </div>
          ))}
             </Horizontal>
        
      )}
    </div>
    
  );
}

export default UsersList;