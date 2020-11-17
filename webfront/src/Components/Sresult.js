import React from 'react';
const Sresult=(props)=>{
    const data = `http://127.0.0.1:8000/dyanmicsearch/?search=${props.author}&search_fields=author`;
    return (
        <div>
            <img src={data.imgurl}/>
        </div>
    );
};
export default Sresult;
