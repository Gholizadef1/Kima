
import React, { useState, useEffect } from "react";


function Sresult(){
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/bookdetail/`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
        });
    }, []);
  
   //const img = `https://jsonplaceholder.typicode.com/users${props.name}`;
    return(
        <div>
             
          {suggestions.map((current) => ( 
               <img src={current.imgurl}/>
          ))}
        </div>
    )
}
export default Sresult;