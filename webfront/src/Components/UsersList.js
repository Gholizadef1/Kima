import axios from 'axios';
import React, { useState, useEffect } from "react";
import { HelpingNavbar } from './HelpingNavbar';

function UsersList() {
  const [user,setUser] = useState({user:null});
  const [search,setSearch] = useState([]);
  const [users,setUsers] = useState([]);
 
 const handleChange = event => {
    setUser({ user: event.target.value });
  }

const searchUsers = async () => {
try {
const result = await axios.get(`http://127.0.0.1:8000/dyanmicsearch`,{params:{
  search:user.user,
  search_fields:'author',}
}).then((res)=> {
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
    <div className = "search">
        
        
            <input type="text" name="name" onChange={handleChange}  value={user.user} style={{position:"absolute",left:1000,top:18,textAlign:"right"}} placeholder="...جستجو" />
          {search.map((item) => (
        <div className="out" key={item.id}  style={{padding:800}}>
        <h5 className="card-title2">{item.title}</h5>
         <div className="card cat">
            <img
              className="squere" 
              src={item.imgurl}
              height={56}
              width={56}
            />
          </div>
          </div>
          
        )
        )            
}

        
 </div>
    );
}  
 

export default UsersList;