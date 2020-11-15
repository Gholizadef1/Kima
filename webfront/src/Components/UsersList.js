import axios from 'axios';
import React, { useState, useEffect } from "react";
function UsersList() {
  const [user,setUser] = useState({user:""});
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
});
if (search == [null]) {
setSearch([]);
} else {
setSearch(result.data);
}
}
catch (err) {}
};
useEffect(()=>{
  const UsersList = () => {
    axios.get(`http://127.0.0.1:8000/dyanmicsearch/`)
    .then((res)=> {
      setUser([res.data])
    })
    .catch((error)=>{});
  };
    UsersList();

},[]);
useEffect(() => {
  searchUsers();
  }, [user]);

    return ( 
    <div className = "search">
      {search.map((item) => (
        <div className="out" key={item.id}>
        <h5 className="card-title2">{item.name}</h5>
         <div className="card cat">
            <img
              className="squere" 
              src={item.imgurl}
              height={56}
              width={56}
            />
    
        <label>
            <input type="text" name="name" onChange={handleChange}  value={user.user} />
          </label>
          <button type="submit">Search</button>
          </div>
          </div>
          
        )
        )            
}
        
 </div>
    );
}  
 

export default UsersList;